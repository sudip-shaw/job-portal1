let jobs = document.querySelector("#job-lists");
let jobsPages = document.querySelector("#jobsPages");
let activePage = jobsPages.querySelector(".active");
let nextButton = document.querySelector("#nextButton");
let prevButton = document.querySelector("#prevButton");

let totalJobsInOnePage = 4;
let currentPage = 1;
let totalJobs = jobsList.length;
let totalPage = Math.ceil(totalJobs/totalJobsInOnePage);
let currentPageToDisplay = [1,2,3,4];

let renderJobs = () => {    
    let indexToStart = totalJobsInOnePage*(currentPage-1);
    for(let i=indexToStart;i<Math.min(indexToStart + totalJobsInOnePage,jobsList.length);i++){
        jobs.innerHTML += jobsList[i];
    }
}

let renderPageNumbers = () => {
    for(let i=0;i<Math.min(totalPage, currentPageToDisplay.length);i++){
        let element = document.createElement('a');
        element.href = "#";
        element.innerHTML = currentPageToDisplay[i];        
        if(currentPageToDisplay[i] == 1) {
            jobsPages.appendChild(element);
            activePage = element;
        }
        else jobsPages.innerHTML += `<a href="#">${currentPageToDisplay[i]}</a>`;
    }
}

let updatePageUI = () => {
    clearJobsFromUI();
    renderJobs();
}

let unsetActivClass = (element) => {
    element.setAttribute("class", "");
}

let setActiveClass = (element) => {
    element.setAttribute("class", "active");
}

// Clear jobs list from UI
let clearJobsFromUI = () =>  jobs.innerHTML = '';

jobsPages.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    unsetActivClass(activePage);
    setActiveClass(e.path[0]);  
    activePage = e.path[0]; 
    currentPage = e.path[0].outerText;
    updatePageUI();
})

nextButton.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    prevButton.setAttribute("class", "prev");
    if(currentPageToDisplay[2] >= totalPage) {
        nextButton.setAttribute("class", "disableButton");
        return;
    }
    for(let i=0;i<currentPageToDisplay.length;i++){
        currentPageToDisplay[i] += 1;
    }
    jobsPages.innerHTML = "";
    renderPageNumbers();
})

prevButton.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    nextButton.setAttribute("class", "next");
    if(currentPageToDisplay[0] <= 1) {
        prevButton.setAttribute("class", "disableButton");
        return;
    }
    for(let i=0;i<currentPageToDisplay.length;i++){
        currentPageToDisplay[i] -= 1;
    }
    jobsPages.innerHTML = "";
    renderPageNumbers();
})
