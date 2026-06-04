const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const routesFile = path.join(__dirname, 'src', 'routes', 'AppRoutes.jsx');

const groupings = {
  'auth': ['Login.jsx', 'Logout.jsx', 'ForgotPassword.jsx', 'ResetPassword.jsx'],
  'dashboard': ['Dashboard.jsx', 'Analytics.jsx', 'AnalyticsList.jsx', 'LeaderBoard.jsx'],
  'courses': ['AllCourses.jsx', 'AddCourse.jsx', 'EditCourse.jsx', 'CourseCategories.jsx', 'AddCourseCategory.jsx', 'EditCourseCategory.jsx', 'PopularCourses.jsx', 'RecommendedCourses.jsx', 'CourseRatings.jsx', 'CourseWishlist.jsx'],
  'notes': ['AllNotes.jsx', 'AddNotes.jsx', 'NotesCategory.jsx', 'AddNotesCategory.jsx', 'NotesSubCategory.jsx', 'AddNotesSubCategory.jsx', 'NotesRegistrations.jsx', 'NotesWishlist.jsx'],
  'test-series': ['TestSeriesCategory.jsx', 'AddTestSeriesCategory.jsx', 'TestSeriesPackages.jsx', 'AddTestSeriesPackage.jsx', 'TestSeriesRegistrations.jsx', 'TestSeriesWishlist.jsx'],
  'live-classes': ['LiveClasses.jsx', 'AddLiveClass.jsx', 'ClassesList.jsx', 'AddClass.jsx', 'BatchManagement.jsx'],
  'events-webinars': ['EventList.jsx', 'AddEvent.jsx', 'EventCategoryList.jsx', 'AddEventCategory.jsx', 'EventRegistrations.jsx', 'WebinarRegistrations.jsx', 'WebinarWishlist.jsx'],
  'users-teams': ['AppUsers.jsx', 'UserRoleList.jsx', 'AddUser.jsx', 'TeamsList.jsx', 'AddTeam.jsx'],
  'instructors': ['InstructorList.jsx', 'AddInstructor.jsx', 'EditInstructor.jsx'],
  'marketing': ['BannersList.jsx', 'AddBanner.jsx', 'CouponsList.jsx', 'AddCoupon.jsx', 'OffersList.jsx', 'AddOffer.jsx', 'LeadGenerateList.jsx', 'AddLeadGenerate.jsx'],
  'cms-content': ['NewsList.jsx', 'AddNews.jsx', 'StudentNewsList.jsx', 'SuccessStoryList.jsx', 'AddSuccessStory.jsx', 'PlacementTalksList.jsx', 'AddPlacementTalk.jsx', 'HomePageReviews.jsx', 'AddUserReview.jsx', 'StudentTestimonialList.jsx', 'BrandVideoList.jsx'],
  'jobs-careers': ['JobUpdatesList.jsx', 'AddJobUpdate.jsx', 'JobRegistrations.jsx', 'HireWithUsList.jsx'],
  'locations': ['LocationCountry.jsx', 'LocationState.jsx', 'LocationCity.jsx'],
  'partners-clients': ['PartnersList.jsx', 'AddPartner.jsx', 'ClientList.jsx', 'AddClient.jsx', 'AlliedList.jsx', 'AddAllied.jsx'],
  'settings': ['Settings.jsx', 'ApplicationSetting.jsx', 'MyProfile.jsx', 'ModuleSubModuleList.jsx'],
  'misc': ['ContactQueriesList.jsx', 'SendNotification.jsx', 'SubjectRatings.jsx', 'AddSubjectRating.jsx', 'Registrations.jsx', 'CertificateRequests.jsx', 'PlaceholderPage.jsx']
};

let routesContent = fs.readFileSync(routesFile, 'utf8');

const fileToDir = {};
for (const [dir, files] of Object.entries(groupings)) {
  const fullDir = path.join(pagesDir, dir);
  if (!fs.existsSync(fullDir)) {
    fs.mkdirSync(fullDir, { recursive: true });
  }
  for (const file of files) {
    fileToDir[file] = dir;
    const oldPath = path.join(pagesDir, file);
    const newPath = path.join(fullDir, file);
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Moved ${file} to ${dir}/`);
    }
  }
}

for (const [file, dir] of Object.entries(fileToDir)) {
  const componentName = file.replace('.jsx', '');
  const oldImport = `from '../pages/${componentName}'`;
  const newImport = `from '../pages/${dir}/${componentName}'`;
  routesContent = routesContent.replace(new RegExp(oldImport, 'g'), newImport);
}

fs.writeFileSync(routesFile, routesContent);
console.log('AppRoutes.jsx updated successfully.');
