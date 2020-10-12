let jobsList = [];

let getData = () => {  
  $.ajax({
    type: "GET",
    url: "js/Data/jobsDetails.json",
    success: (data) => {
      let dataLength = Object.keys(data).length;
      let revData = {};
      let j = 0;
      for(let i=dataLength-1; i>=0; i--){
        revData[j++] = data[i];
      }
      data = revData;

      addJobsToUI(data);
      totalJobs = jobsList.length;
      totalPage = Math.ceil(totalJobs/totalJobsInOnePage);
      renderJobs();
      renderPageNumbers();
    }
  })
}

let addJobsToUI = (data) => {  
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
    jobsList[i] = (jobTemplate);
    
  }
}

getData();