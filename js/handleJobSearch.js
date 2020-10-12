const search = document.querySelector("#searchJob");
const displaySearchResult = document.querySelector("#job-searched-lists");
let jobDetails = {};
let searchedJobAvailableObj = {};
let searchedJobList = [];

search.addEventListener('submit', (e) => {
    e.preventDefault();
    // displaySearchResult.innerHTML = '';
    let data = new FormData(search);
    let jobName = data.get("jobName").toLowerCase();
    let region = data.get("region").toLowerCase();
    let jobTitle = data.get("jobTitle").toLowerCase();

    // Check that job is available or not in the job list...
    if(isJobAvailable(jobName, region, jobTitle)) {
        addJobsToSearchedUI(searchedJobAvailableObj);
        renderSearchedJobs();
        displaySearchResult.style.display = "block";
    }
})

const isJobAvailable = (jobName, region, jobTitle) => {
    let obj = getJobsBasedOnName(jobName);
    obj = getJobsBasedOnRegion(region, obj);
    obj = getJobsBasedOnTitle(jobTitle, obj);

    if(Object.keys(obj).length == 0 && obj.constructor == Object){
        return false;
    }

    searchedJobAvailableObj = { ...obj };
    return true;

}

let addJobsToSearchedUI = (data) => {  
    for(let i in data) {    
      let jobTemplate = `
        <li class="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <a href="${data[i].jobDetailsReference}"></a>
            <div class="job-listing-logo">
            <img src="${data[i].jobLogoPath}" alt="${data[i].jobLogoAlternate}" class="img-fluid">
            </div>
            <div class="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
            <div class="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>${data[i].desc}</h2>
                <strong>${data[i].jobName}</strong>
            </div>
            <div class="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span class="icon-room"></span> ${data[i].jobLocation}
            </div>
            <div class="job-listing-meta">
                <span class="badge badge-danger">${data[i].jobStatus}</span>
            </div>
            </div>
        </li>
      `
      searchedJobList[i] = (jobTemplate);
      
    }
}

const renderSearchedJobs = () => {
    let size = Object.keys(searchedJobAvailableObj).length;
    for(let job=0;job<size;job++){
        displaySearchResult.innerHTML += searchedJobList[job];
    }
}

const getJobsBasedOnName = (jobName) => {
    // Search on jobDetails...
    let updatedJobs = new Object();
    let newJobCount = 0;
    let size = Object.keys(jobDetails).length;

    if(jobName == "") return jobDetails;
    for(let i=0;i<size;i++){
        if(jobDetails[i].jobName.toLowerCase() == jobName){
            updatedJobs[newJobCount++] = jobDetails[i];
        }
    }
    return updatedJobs;
}

const getJobsBasedOnRegion = (region, obj) => {
    // Search on getJobsBasedOnName object
    let updatedJobs = new Object();
    let newJobCount = 0;
    let size = Object.keys(obj).length;

    if(region == "" || region == "anywhere" || region == "across india") return obj;
    for(let i=0;i<size;i++){
        let countries = obj[i].jobLocation.toLowerCase();
        if(countries.search(region) != -1){
            updatedJobs[newJobCount++] = obj[i];
        }
    }
    return updatedJobs;
}

const getJobsBasedOnTitle = (jobTitle, obj) => {
    // Search on getJobsBasedOnRegion object...
    let updatedJobs = new Object();
    let newJobCount = 0;
    let size = Object.keys(obj).length;

    if(jobTitle == "") return obj;
    for(let i=0;i<size;i++){
        if(obj[i].jobStatus.toLowerCase() == jobTitle) {
            updatedJobs[newJobCount++] = obj[i];
        }
    }
    return updatedJobs;
}

const getJobData = () => {
    $.ajax({
        type: "GET",
        url: "js/Data/jobsDetails.json",
        success: (data) => {
          jobDetails = data;
        }
    })
}

if(Object.keys(jobDetails).length == 0 && jobDetails.constructor == Object){
    getJobData();
}