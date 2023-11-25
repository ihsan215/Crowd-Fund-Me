//SPDX-License-Identifier: MIT

pragma solidity 0.8.18;


contract FundMe{

    address public admin;
    uint8 private constant MAX_UNSOLVED_REQUEST = 5;
    uint8 private constant MAX_PROJECT = 5;
    uint256 public Project_ID_Count;
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

    // Projects Struct user can create MAX_PROJECT unsolved procect
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
        uint256 total_required_amount;
        uint256 current_amount;
        uint8 unsolved_request;
        Request[] requests;
    }

     Project[] public projects;
     mapping(address => uint8) public project_count;
     mapping(address => uint256[]) public project_mapping;
     mapping(address => uint256[]) public donated_project_mapping;
     mapping(address => mapping(uint256 => bool)) public check_is_donated;
     mapping(address => uint256) public total_foundation_mapping;
     mapping(address => mapping(uint256=>uint256)) public project_total_foundation_mapping;
     uint256 public total_sponsors;

     
     // Events
     event Created_Project(uint256 indexed id, address indexed owner, string title);
     event Created_Request(uint8 indexed id, address indexed owner,string title);
     event Supported_Project(uint256 indexed id, address indexed from, uint256 value);
     
    // Custrom Errors
    error TooMuchProjectRequest(uint8 current_project_count);
    error TooLessContribution(uint256 current_contribution, uint256 required_contribution);
    error RequiredAmountCollected(uint amount);
    error InsufficientBalance(uint256 current_amount, uint256 required_amount);

    constructor() {
        admin = msg.sender;
        Project_ID_Count = 0;
    }

    modifier only_admin_call(){
        require(msg.sender == admin);
        _;
    }

    modifier project_check(uint256 project_id){
        require(!projects[project_id].is_complete);
        _;
    }

    modifier request_check(uint256 project_id, uint8 request_id)  {
        require(!projects[project_id].requests[request_id].is_complete);
        _;
    }
    
    function create_project(string memory _title, string memory _description, uint256 _minimum_contribution) public returns(bool success){
        
        // initialize the process
        success = false;    

        // Check project count (only create MAX_PROJECT)
        if(project_count[msg.sender] >= MAX_PROJECT){
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
        project.total_required_amount = 0;
        project.current_amount = 0;
        project.unsolved_request = 0;
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

    function create_request(uint256 _id, string memory _description, string memory _title, address payable _buyer, uint256 _value) project_check(_id) public returns(bool success){
        
        // Initialize process
        success = false;

        // Create project instance for gas save
        Project storage projectIntance = projects[_id];
        

        // only project owner can call 
        require(msg.sender == projectIntance.project_owner, "Only project owner can create an request");

        // Check unsolved request
        if(projectIntance.unsolved_request >= MAX_UNSOLVED_REQUEST){
               revert TooMuchProjectRequest({
                current_project_count: projectIntance.unsolved_request
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
        projectIntance.unsolved_request++;
        projectIntance.total_required_amount += _value;

        return success;
    }

    // support project 
    function support_project(uint256 project_id) project_check(project_id) public payable returns(bool success){
        
        // Initialize process
        success = false;

        // Create project instance
        Project storage projectInstance = projects[project_id];

        // check required balance
        uint256 required_balance;

        // Check required amount is collected
        if(projectInstance.current_amount >= projectInstance.total_required_amount){
                revert RequiredAmountCollected({
                amount: projectInstance.current_amount
            });
        }
        else{
            required_balance = projectInstance.total_required_amount - projectInstance.current_amount;
        }

        // check minimum contrubition
        if( required_balance > projectInstance.minimum_contribution && projectInstance.minimum_contribution > msg.value){
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
        projectInstance.current_amount += msg.value;

        // Emit Event
        emit Supported_Project(project_id, msg.sender, msg.value);
        total_foundation_mapping[msg.sender] += msg.value;
        project_total_foundation_mapping[msg.sender][project_id] += msg.value;
     

        bool is_donated = check_is_donated[msg.sender][project_id];
        if(!is_donated){
        donated_project_mapping[msg.sender].push(project_id);
        check_is_donated[msg.sender][project_id] = true;
           total_sponsors++;
        }


        return success;
    }

    // vote request
    function approve_request(uint256 _project_id, uint8 _request_id) request_check(_project_id,_request_id) public returns(bool success){
        
        // initalize process
        success = false;
        
        // get project and request
        Project storage projectInstance = projects[_project_id];
        Request storage requestInstance = projectInstance.requests[_request_id];


        // check is the approver funder
        if(projectInstance.sponsors[msg.sender] == 0){
            revert("Only approve the sponsor");
        } 

        // check only vote once
        if(requestInstance.approvals[msg.sender]){
            revert("Only approve once for an request");
        }

        // assign approvals
        requestInstance.approvals[msg.sender] = true;
        requestInstance.approval_vote_count++;

        success = true;

        return success;
    }

    // finalize request
    function finalize_request(uint256 _project_id, uint8 _request_id) request_check(_project_id,_request_id) public returns(bool success){

        success = false;
        // get project and request
        Project storage projectInstance = projects[_project_id];
        Request storage requestInstance = projectInstance.requests[_request_id];

        // only project owner can finilize the request
        require(msg.sender == projectInstance.project_owner);

        // check the vote
        require(requestInstance.approval_vote_count > (projectInstance.sponsors_count / 2));
        require(!requestInstance.is_complete);

        // check balance
        if(projectInstance.current_amount < requestInstance.value){
              revert InsufficientBalance({
                current_amount: projectInstance.current_amount,
                required_amount: requestInstance.value
            });
        }

        // send money to buyer
         payable(requestInstance.buyer).transfer(requestInstance.value);

        // reduce current amount & total required amount
        projectInstance.current_amount -= requestInstance.value;
        projectInstance.total_required_amount -= requestInstance.value;

        requestInstance.is_complete = true;
        if(projectInstance.unsolved_request > 0){
            projectInstance.unsolved_request--;
        }

        success = true;
        return success;
    }   

    // finalize  project
    function finalize_project(uint256 _project_id) project_check(_project_id) public returns (bool success) {

        success = false;
        Project storage projectInstance = projects[_project_id];

        // only owner can call this function
        require(msg.sender == projectInstance.project_owner);

        // require all request are done
        require(projectInstance.unsolved_request == 0);

        // require all amount spent
        require(projectInstance.current_amount == 0);

        // require total required amount must be zero
        require(projectInstance.total_required_amount == 0);

        // mark project as is completed
        projectInstance.is_complete = true;


        success = true;
        return success;

    }


    // max return size 5
    function returnProject() public view returns(uint256[] memory){
        return project_mapping[msg.sender];
    }

    function returnDonatedProject() public view returns(uint256[] memory){
        return donated_project_mapping[msg.sender];
    }

    function returnDonatedAmountAnProject(uint256 project_id) public view returns(uint256 ){
        return project_total_foundation_mapping[msg.sender][project_id];
    }

    function returnRequest(uint256 project_id, uint256 request_id) public view returns(string memory, string memory, address ,uint256,bool,uint256){
        Project storage projectInstance = projects[project_id];
        Request storage requestInstance = projectInstance.requests[request_id];
        return(requestInstance.title,requestInstance.description,requestInstance.buyer, requestInstance.value,requestInstance.is_complete,requestInstance.approval_vote_count);
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

    function return_is_request_approve(uint256 _project_id, uint8 _request_id)public view returns(bool){
                // get project and request
        Project storage projectInstance = projects[_project_id];
        Request storage requestInstance = projectInstance.requests[_request_id];
        return requestInstance.approvals[msg.sender];
    }


    // safe maths functions     
    function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
        if (a == 0) {
        return 0;
        }
        c = a * b;
        assert(c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }


}