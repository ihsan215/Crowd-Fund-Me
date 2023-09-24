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
        string description;
        address payable buyer;
        uint256 approval_vote_count;
        bool is_complete;
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
        uint256 id;
        Request[MAX_UNSOLVED_REQUEST] request;
    }

    
     Project[] public projects;
     mapping(address => uint8) public project_count;

     // Events
     event Created_Project(uint256 indexed id, address indexed owner, string title);
     

    // Custrom Errors
    error TooMuchProjectRequest(uint8 current_project_count);


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
        if(project_count[msg.sender] > MAX_UNSOLVED_PROJECT){
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
        project.is_complete = false;

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