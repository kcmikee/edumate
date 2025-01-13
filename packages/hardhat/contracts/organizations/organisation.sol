// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../interfaces/INFT.sol";
import "../interfaces/IFactory.sol";

contract Organisation {
    /**
     * ============================================================ *
     * --------------------- ORGANIZATION RECORD------------------- *
     * ============================================================ *
     */
    string organization;
    string cohort;
    string public certiificateURI;
    address organisationFactory;
    address public NftContract;
    address public certificateContract;
    bool public certificateIssued;
    string public organisationImageUri;
    bool public isOngoing = true;

    address public spokContract;
    string public spokURI;

    bool public spokMinted;
    mapping(address => bool) requestNameCorrection;

    /**
     * ============================================================ *
     * --------------------- ATTENDANCE RECORD--------------------- *
     * ============================================================ *
     */
    bytes[] LectureIdCollection;
    mapping(bytes => lectureData) lectureInstance;
    mapping(bytes => bool) lectureIdUsed;
    struct lectureData {
        address mentorOnDuty;
        string topic;
        string uri;
        uint attendanceStartTime;
        uint studentsPresent;
        bool status;
    }

    /**
     * ============================================================ *
     * --------------------- STUDENTS RECORD------------------- *
     * ============================================================ *
     */
    address[] students;
    mapping(address => individual) studentsData;
    mapping(address => uint) indexInStudentsArray;
    mapping(address => uint) studentsTotalAttendance;
    mapping(address => bool) isStudent;
    mapping(address => bytes[]) classesAttended;
    mapping(address => mapping(bytes => bool)) IndividualAttendanceRecord;
    string[] resultCid;
    mapping(uint256 => bool) testIdUsed;

    /**
     * ============================================================ *
     * --------------------- STAFFS RECORD------------------------- *
     * ============================================================ *
     */
    address moderator;
    address mentorOnDuty;
    address[] mentors;
    mapping(address => uint) indexInMentorsArray;
    mapping(address => bytes[]) moderatorsTopic;
    mapping(address => bool) isStaff;
    mapping(address => individual) mentorsData;
    // EVENTS
    event staffsRegistered(uint noOfStaffs);
    event nameChangeRequested(address changer);
    event StaffNamesChanged(uint noOfStaffs);
    event studentsRegistered(uint noOfStudents);
    event studentNamesChanged(uint noOfStudents);
    event attendanceCreated(bytes indexed lectureId, string indexed uri, string topic, address indexed staff);
    event topicEditted(bytes Id, string oldTopic, string newTopic);
    event AttendanceSigned(bytes Id, address signer);
    event Handover(address oldMentor, address newMentor);
    event attendanceOpened(bytes Id, address mentor);
    event attendanceClosed(bytes Id, address mentor);
    event studentsEvicted(uint noOfStudents);
    event mentorsRemoved(uint noOfStaffs);
    event newResultUpdated(uint256 testId, address mentor);

    // MODIFIERS
    modifier onlyModerator() {
        require(msg.sender == moderator, "NOT MODERATOR");
        _;
    }
    modifier onlyMentorOnDuty() {
        require(msg.sender == mentorOnDuty, "NOT MODERATOR ON DUTY");
        _;
    }
    modifier onlyStudents() {
        require(isStudent[msg.sender] == true, "NOT A VALID STUDENT");
        _;
    }
    modifier onlyStudentOrStaff() {
        require(
            isStudent[msg.sender] == true || msg.sender == moderator || isStaff[msg.sender] == true,
            "NOT ALLOWED TO REQUEST A NAME CHANGE"
        );
        _;
    }
    modifier onlyStaff() {
        require(msg.sender == moderator || isStaff[msg.sender] == true, "NOT MODERATOR");
        _;
    }

    // ERRORS
    error lecture_id_already_used();
    error not_Autorized_Caller();
    error Invalid_Lecture_Id();
    error Lecture_id_closed();
    error Attendance_compilation_started();
    error Already_Signed_Attendance_For_Id();
    error already_requested();
    error not_valid_student();
    error not_valid_Moderator();
    error not_valid_lecture_id();

    // @dev: constructor initialization
    // @params: _organization: Name of company,
    // @params: _cohort: Name of specific Cohort/ Program,
    constructor(
        string memory _organization,
        string memory _cohort,
        address _moderator,
        string memory _adminName,
        string memory _uri
    ) {
        moderator = _moderator;
        organization = _organization;
        cohort = _cohort;
        organisationFactory = msg.sender;
        mentorOnDuty = _moderator;
        indexInMentorsArray[_moderator] = mentors.length;
        mentors.push(_moderator);
        isStaff[_moderator] = true;
        mentorsData[_moderator]._address = _moderator;
        mentorsData[_moderator]._name = _adminName;
        organisationImageUri = _uri;
    }

    function initialize(address _NftContract, address _certificateContract, address _spokContract) external {
        if (msg.sender != organisationFactory) revert not_Autorized_Caller();
        NftContract = _NftContract;
        certificateContract = _certificateContract;
        spokContract = _spokContract;
    }

    // @dev: Function to register staffs to be called only by the moderator
    // @params: staffList: An array of structs(individuals) consisting of name and wallet address of staffs.
    function registerStaffs(individual[] calldata staffList) external onlyModerator {
        uint staffLength = staffList.length;
        for (uint i; i < staffLength; i++) {
            if (isStaff[staffList[i]._address] == false && isStudent[staffList[i]._address] == false) {
                mentorsData[staffList[i]._address] = staffList[i];
                isStaff[staffList[i]._address] = true;
                indexInMentorsArray[staffList[i]._address] = mentors.length;
                mentors.push(staffList[i]._address);
            }
        }
        // UCHE
        IFACTORY(organisationFactory).register(staffList);
        emit staffsRegistered(staffList.length);
    }

    function TransferOwnership(address newModerator) external onlyModerator {
        assert(newModerator != address(0));
        moderator = newModerator;
    }

    // @dev: Function to register students to be called only by the moderator
    // @params: _studentList: An array of structs(individuals) consisting of name and wallet address of students.
    function registerStudents(individual[] calldata _studentList) external onlyModerator {
        uint studentLength = _studentList.length;
        for (uint i; i < studentLength; i++) {
            if (isStudent[_studentList[i]._address] == false && isStaff[_studentList[i]._address] == false) {
                studentsData[_studentList[i]._address] = _studentList[i];
                indexInStudentsArray[_studentList[i]._address] = students.length;
                students.push(_studentList[i]._address);
                isStudent[_studentList[i]._address] = true;
            }
        }
        // UCHE
        IFACTORY(organisationFactory).register(_studentList);
        emit studentsRegistered(_studentList.length);
    }

    // @dev: Function to request name correction
    function RequestNameCorrection() external onlyStudentOrStaff {
        if (requestNameCorrection[msg.sender] == true) revert already_requested();
        requestNameCorrection[msg.sender] = true;
        emit nameChangeRequested(msg.sender);
    }

    function editStudentName(individual[] memory _studentList) external onlyStudentOrStaff {
        uint studentLength = _studentList.length;
        for (uint i; i < studentLength; i++) {
            if (requestNameCorrection[_studentList[i]._address] == true) {
                studentsData[_studentList[i]._address] = _studentList[i];
                requestNameCorrection[_studentList[i]._address] = false;
            }
        }
        emit studentNamesChanged(_studentList.length);
    }

    function editMentorsName(individual[] memory _mentorsList) external onlyStudentOrStaff {
        uint MentorsLength = _mentorsList.length;
        for (uint i; i < MentorsLength; i++) {
            if (requestNameCorrection[_mentorsList[i]._address] == true) {
                mentorsData[_mentorsList[i]._address] = _mentorsList[i];
                requestNameCorrection[_mentorsList[i]._address] = false;
            }
        }
        emit StaffNamesChanged(_mentorsList.length);
    }

    // @dev: Function to Create Id for a particular Lecture Day, this Id is to serve as Nft Id. Only callable by mentor on duty.
    // @params:  _lectureId: Lecture Id of chaice, selected by mentor on duty.
    // @params:  _uri: Uri for the particular Nft issued to students that attended class for that day.
    // @params:  _topic: Topic covered for that particular day, its recorded so as to be displayed on students dashboard.
    function createAttendance(
        bytes calldata _lectureId,
        string calldata _uri,
        string calldata _topic
    ) external onlyMentorOnDuty {
        if (lectureIdUsed[_lectureId] == true) revert lecture_id_already_used();
        lectureIdUsed[_lectureId] = true;
        LectureIdCollection.push(_lectureId);
        lectureInstance[_lectureId].uri = _uri;
        lectureInstance[_lectureId].topic = _topic;
        lectureInstance[_lectureId].mentorOnDuty = msg.sender;
        moderatorsTopic[msg.sender].push(_lectureId);

        // NONSO GENESIS
        INFT(NftContract).setDayUri(_lectureId, _uri);
        emit attendanceCreated(_lectureId, _uri, _topic, msg.sender);
    }

    // @dev: Function to mint spok
    function mintMentorsSpok(string memory Uri) external onlyModerator {
        require(spokMinted == false, "spok already minted");
        INFT(spokContract).batchMintTokens(mentors, Uri);
        spokURI = Uri;
        spokMinted = true;
    }

    function editTopic(bytes memory _lectureId, string calldata _topic) external {
        if (msg.sender != lectureInstance[_lectureId].mentorOnDuty) revert not_Autorized_Caller();
        if (lectureInstance[_lectureId].attendanceStartTime != 0) revert Attendance_compilation_started();
        string memory oldTopic = lectureInstance[_lectureId].topic;
        lectureInstance[_lectureId].topic = _topic;
        emit topicEditted(_lectureId, oldTopic, _topic);
    }

    function signAttendance(bytes memory _lectureId) external onlyStudents {
        if (lectureIdUsed[_lectureId] == false) revert Invalid_Lecture_Id();
        if (lectureInstance[_lectureId].status == false) revert Lecture_id_closed();
        if (IndividualAttendanceRecord[msg.sender][_lectureId] == true) revert Already_Signed_Attendance_For_Id();
        if (lectureInstance[_lectureId].attendanceStartTime == 0) {
            lectureInstance[_lectureId].attendanceStartTime = block.timestamp;
        }
        IndividualAttendanceRecord[msg.sender][_lectureId] = true;
        studentsTotalAttendance[msg.sender] = studentsTotalAttendance[msg.sender] + 1;
        lectureInstance[_lectureId].studentsPresent = lectureInstance[_lectureId].studentsPresent + 1;
        classesAttended[msg.sender].push(_lectureId);

        // NONSO GENESIS
        INFT(NftContract).mint(msg.sender, _lectureId, 1);
        emit AttendanceSigned(_lectureId, msg.sender);
    }

    // @dev Function for mentors to hand over to the next mentor to take the class

    function mentorHandover(address newMentor) external {
        if (msg.sender != mentorOnDuty && msg.sender != moderator) revert not_Autorized_Caller();
        mentorOnDuty = newMentor;
        emit Handover(msg.sender, newMentor);
    }

    function openAttendance(bytes calldata _lectureId) external onlyMentorOnDuty {
        if (lectureIdUsed[_lectureId] == false) revert Invalid_Lecture_Id();
        if (lectureInstance[_lectureId].status == true) revert("Attendance already open");
        if (msg.sender != lectureInstance[_lectureId].mentorOnDuty) revert not_Autorized_Caller();

        lectureInstance[_lectureId].status = true;
        emit attendanceOpened(_lectureId, msg.sender);
    }

    function closeAttendance(bytes calldata _lectureId) external onlyMentorOnDuty {
        if (lectureIdUsed[_lectureId] == false) revert Invalid_Lecture_Id();
        if (lectureInstance[_lectureId].status == false) revert("Attendance already closed");
        if (msg.sender != lectureInstance[_lectureId].mentorOnDuty) revert not_Autorized_Caller();

        lectureInstance[_lectureId].status = false;
        emit attendanceClosed(_lectureId, msg.sender);
    }

    function RecordResults(uint256 testId, string calldata _resultCid) external onlyMentorOnDuty {
        require(testIdUsed[testId] == false, "TEST ID ALREADY USED");
        testIdUsed[testId] = true;
        resultCid.push(_resultCid);
        emit newResultUpdated(testId, msg.sender);
    }

    function getResultCid() external view returns (string[] memory) {
        return resultCid;
    }

    function EvictStudents(address[] calldata studentsToRevoke) external onlyModerator {
        uint studentsToRevokeList = studentsToRevoke.length;
        for (uint i; i < studentsToRevokeList; i++) {
            delete studentsData[studentsToRevoke[i]];

            students[indexInStudentsArray[studentsToRevoke[i]]] = students[students.length - 1];
            students.pop();
            isStudent[studentsToRevoke[i]] = false;
        }

        // UCHE
        IFACTORY(organisationFactory).revoke(studentsToRevoke);
        emit studentsEvicted(studentsToRevoke.length);
    }

    function removeMentor(address[] calldata rouge_mentors) external onlyModerator {
        uint mentorsRouge = rouge_mentors.length;
        for (uint i; i < mentorsRouge; i++) {
            delete mentorsData[rouge_mentors[i]];
            mentors[indexInMentorsArray[rouge_mentors[i]]] = mentors[mentors.length - 1];
            mentors.pop();
            isStaff[rouge_mentors[i]] = false;
        }
        IFACTORY(organisationFactory).revoke(rouge_mentors);
        emit mentorsRemoved(rouge_mentors.length);
    }

    function getNameArray(address[] calldata _students) external view returns (string[] memory) {
        string[] memory Names = new string[](_students.length);
        string memory emptyName;
        for (uint i = 0; i < _students.length; i++) {
            if (
                keccak256(abi.encodePacked(studentsData[_students[i]]._name)) == keccak256(abi.encodePacked(emptyName))
            ) {
                Names[i] = "UNREGISTERED";
            } else {
                Names[i] = studentsData[_students[i]]._name;
            }
        }
        return Names;
    }

    function MintCertificate(string memory Uri) external onlyModerator {
        require(certificateIssued == false, "certificate already issued");
        INFT(certificateContract).batchMintTokens(students, Uri);
        certiificateURI = Uri;
        certificateIssued = true;
    }

    //VIEW FUNCTION
    function liststudents() external view returns (address[] memory) {
        return students;
    }

    function VerifyStudent(address _student) external view returns (bool) {
        return isStudent[_student];
    }

    function getStudentName(address _student) external view returns (string memory name) {
        if (isStudent[_student] == false) revert not_valid_student();
        return studentsData[_student]._name;
    }

    function getStudentAttendanceRatio(address _student) external view returns (uint attendace, uint TotalClasses) {
        if (isStudent[_student] == false) revert not_valid_student();
        attendace = studentsTotalAttendance[_student];
        TotalClasses = LectureIdCollection.length;
    }

    function getStudentsPresent(bytes memory _lectureId) external view returns (uint) {
        return lectureInstance[_lectureId].studentsPresent;
    }

    function listClassesAttended(address _student) external view returns (bytes[] memory) {
        if (isStudent[_student] == false) revert not_valid_student();
        return classesAttended[_student];
    }

    function getLectureIds() external view returns (bytes[] memory) {
        return LectureIdCollection;
    }

    function getLectureData(bytes calldata _lectureId) external view returns (lectureData memory) {
        if (lectureIdUsed[_lectureId] == false) revert not_valid_lecture_id();
        return lectureInstance[_lectureId];
    }

    function listMentors() external view returns (address[] memory) {
        return mentors;
    }

    function VerifyMentor(address _mentor) external view returns (bool) {
        return isStaff[_mentor];
    }

    function getMentorsName(address _Mentor) external view returns (string memory name) {
        if (isStaff[_Mentor] == false) revert not_valid_Moderator();
        return mentorsData[_Mentor]._name;
    }

    function getClassesTaugth(address _Mentor) external view returns (bytes[] memory) {
        if (isStaff[_Mentor] == false) revert not_valid_Moderator();
        return moderatorsTopic[_Mentor];
    }

    function getMentorOnDuty() external view returns (address) {
        return mentorOnDuty;
    }

    function getModerator() external view returns (address) {
        return moderator;
    }

    function getOrganizationName() external view returns (string memory) {
        return organization;
    }

    function getCohortName() external view returns (string memory) {
        return cohort;
    }

    function getOrganisationImageUri() external view returns (string memory) {
        return organisationImageUri;
    }

    function toggleOrganizationStatus() external {
        isOngoing = !isOngoing;
    }

    function getOrganizationStatus() external view returns (bool) {
        return isOngoing;
    }
}
