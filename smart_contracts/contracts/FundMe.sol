//SPDX-License-Identifier: MIT

pragma solidity 0.8.18;


contract FundMe{

    address public admin;
    uint8 private constant MAX_UNSOLVED_REQUEST = 5;
    uint8 private constant MAX_UNSOLVED_PROJECT = 5;
    uint256 private Project_ID_Count;
    uint256 private constant DECIMAL = 10^18;
    

    // Request struct project owner can create MAX_UNSOLVED_REQUEST unsolved request
    struct Request {
        uint8 request_id;
        string title;
        string description;
        address payable buyer;
        uint256 approval_vote_count;
        bool is_complete;
        uint256 value;
        mapping(address => bool) approvals;
    }

    // Projects Struct user can create MAX_UNSOLVED_PROJECT unsolved procect
    struct Project{
        address project_owner;
        string description;
        string title;
        bool is_complete;
        uint256 minimum_contribution;
        mapping(address => uint256) sponsors;
        uint256 sponsors_count;
        uint256 id;
        uint8 request_count;
        Request[] requests;
    }

    
     Project[] public projects;
     mapping(address => uint8) public project_count;
     mapping(address => uint256[]) public project_mapping;
     

     // Events
     event Created_Project(uint256 indexed id, address indexed owner, string title);
     event Created_Request(uint8 indexed id, address indexed owner,string title);
     event Supported_Project(uint256 indexed id, address indexed from, uint256 value);
     

    // Custrom Errors
    error TooMuchProjectRequest(uint8 current_project_count);
    error TooLessContribution(uint256 current_contribution, uint256 required_contribution);



    constructor() {
        admin = msg.sender;
        Project_ID_Count = 0;
    }

    modifier only_admin_call(){
        require(msg.sender == admin);
        _;
    }
    
    
    
    function create_project(string memory _title, string memory _description, uint256 _minimum_contribution) public returns(bool success){
        
        // initialize the process
        success = false;    

        // Check project count (only create MAX_UNSOLVED_PROJECT)
        if(project_count[msg.sender] >= MAX_UNSOLVED_PROJECT){
               revert TooMuchProjectRequest({
                current_project_count: project_count[msg.sender]
            });
        }

        // create project
        Project storage project = projects.push();
        project.project_owner = msg.sender;
        project.title = _title;
        project.description = _description;
        project.id = Project_ID_Count;
        project.minimum_contribution = _minimum_contribution;
        project.request_count = 0;
        project.sponsors_count = 0;
        project.is_complete = false;

        // track projects via address
        project_mapping[msg.sender].push(Project_ID_Count);

        // Emit event
        emit Created_Project(
            project.id,
            project.project_owner,
            project.title
        );

        // increase counters
        project_count[msg.sender]++;
        Project_ID_Count++;

        // finilize the process
        success = true;
        return success;         
    }

    function create_request(uint256 _id, string memory _description, string memory _title, address payable _buyer, uint256 _value) public returns(bool success){
        
        // Initialize process
        success = false;

        // Create project instance for gas save
        Project storage projectIntance = projects[_id];
        

        // only project owner can call 
        require(msg.sender == projectIntance.project_owner, "Only project owner can create an request");

        // Check unsolved request
        if(projectIntance.request_count >= MAX_UNSOLVED_REQUEST){
               revert TooMuchProjectRequest({
                current_project_count: projectIntance.request_count
            });
        }

        // Create Request
        Request storage request = projectIntance.requests.push();
        request.title = _title;
        request.description = _description;
        request.buyer = _buyer;
        request.request_id = projectIntance.request_count;
        request.is_complete = false;
        request.value = _value;
        request.approval_vote_count = 0;

        // Emit event
        emit Created_Request(request.request_id, msg.sender, request.title);

        // increase counter
        projectIntance.request_count++;


        return success;

    }


    // support project 
    function support_project(uint256 procect_id) public payable returns(bool success){
        
        // Initialize process
        success = false;

        // Create project instance
        Project storage projectInstance = projects[procect_id];

        // check minimum contrubition
        if(projectInstance.minimum_contribution > msg.value){
            revert TooLessContribution({
                current_contribution: msg.value,
                required_contribution: projectInstance.minimum_contribution
            });
        }

        if(projectInstance.sponsors[msg.sender] == 0){
            // increase the counter
            projectInstance.sponsors_count++;
        }

        // add sponsor
        projectInstance.sponsors[msg.sender] += msg.value;

        // Emit Event
        emit Supported_Project(procect_id, msg.sender, msg.value);


    

        return success;


    }

    // max return size 5
    function returnProject() public view returns(uint256[] memory){
        return project_mapping[msg.sender];
    }

    function supponsor_check(address _sponsor, uint256 _procect_id) public view returns(bool status) {

        status = false;
        if(projects[_procect_id].sponsors[_sponsor] > 0){
            status = true;
        }
        return status;
    }

    function return_sponsor_value(address _sponsor, uint256 _procect_id) public view returns(uint256) {
        return projects[_procect_id].sponsors[_sponsor];
    }


    

    // safe maths functions start

    
    function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
        if (a == 0) {
        return 0;
        }
        c = a * b;
        assert(c / a == b);
        return c;
    }



   // safe maths functions end



}