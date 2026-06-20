import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import MainLayout from '../layouts/MainLayout'
const Dashboard = React.lazy(() => import('../pages/dashboard/Dashboard'))
const Registrations = React.lazy(() => import('../pages/misc/Registrations'))
const Analytics = React.lazy(() => import('../pages/dashboard/Analytics'))
const AnalyticsList = React.lazy(() => import('../pages/dashboard/AnalyticsList'))
const AnalyticsDetails = React.lazy(() => import('../pages/dashboard/AnalyticsDetails'))
const Settings = React.lazy(() => import('../pages/settings/Settings'))
const PlaceholderPage = React.lazy(() => import('../pages/misc/PlaceholderPage'))
const Login = React.lazy(() => import('../pages/auth/Login'))
const BatchManagement = React.lazy(() => import('../pages/live-classes/BatchManagement'))
const LiveClasses = React.lazy(() => import('../pages/live-classes/LiveClasses'))
const TestSeriesCategory = React.lazy(() => import('../pages/test-series/TestSeriesCategory'))
const TestSeriesPackages = React.lazy(() => import('../pages/test-series/TestSeriesPackages'))
const Logout = React.lazy(() => import('../pages/auth/Logout'))
const LeaderBoard = React.lazy(() => import('../pages/dashboard/LeaderBoard'))
const CertificateRequests = React.lazy(() => import('../pages/misc/CertificateRequests'))
const TestSeriesRegistrations = React.lazy(() => import('../pages/test-series/TestSeriesRegistrations'))
const NotesRegistrations = React.lazy(() => import('../pages/notes/NotesRegistrations'))
const WebinarRegistrations = React.lazy(() => import('../pages/events-webinars/WebinarRegistrations'))
const JobRegistrations = React.lazy(() => import('../pages/jobs-careers/JobRegistrations'))
const EventRegistrations = React.lazy(() => import('../pages/events-webinars/EventRegistrations'))
const CourseWishlist = React.lazy(() => import('../pages/courses/CourseWishlist'))
const TestSeriesWishlist = React.lazy(() => import('../pages/test-series/TestSeriesWishlist'))
const NotesWishlist = React.lazy(() => import('../pages/notes/NotesWishlist'))
const WebinarWishlist = React.lazy(() => import('../pages/events-webinars/WebinarWishlist'))
const CourseCategories = React.lazy(() => import('../pages/courses/CourseCategories'))
const AllCourses = React.lazy(() => import('../pages/courses/AllCourses'))
const PopularCourses = React.lazy(() => import('../pages/courses/PopularCourses'))
const RecommendedCourses = React.lazy(() => import('../pages/courses/RecommendedCourses'))
const CourseView = React.lazy(() => import('../pages/courses/CourseView'))
const CourseFaq = React.lazy(() => import('../pages/courses/CourseFaq'))
const CourseFeatures = React.lazy(() => import('../pages/courses/CourseFeatures'))
const CourseTools = React.lazy(() => import('../pages/courses/CourseTools'))
const CourseSubjects = React.lazy(() => import('../pages/courses/CourseSubjects'))
const AddCourseSubject = React.lazy(() => import('../pages/courses/AddCourseSubject'))
const CourseTopics = React.lazy(() => import('../pages/courses/CourseTopics'))
const AddCourseTopic = React.lazy(() => import('../pages/courses/AddCourseTopic'))
const CourseTestSeries = React.lazy(() => import('../pages/courses/CourseTestSeries'))
const AddCourseTestSeries = React.lazy(() => import('../pages/courses/AddCourseTestSeries'))
const CourseTrainingHighlights = React.lazy(() => import('../pages/courses/CourseTrainingHighlights'))
const NotesCategory = React.lazy(() => import('../pages/notes/NotesCategory'))
const NotesSubCategory = React.lazy(() => import('../pages/notes/NotesSubCategory'))
const AllNotes = React.lazy(() => import('../pages/notes/AllNotes'))
const ClassesList = React.lazy(() => import('../pages/live-classes/ClassesList'))
const AppUsers = React.lazy(() => import('../pages/users-teams/AppUsers'))
const AppUserDetails = React.lazy(() => import('../pages/users-teams/AppUserDetails'))
const EditAppUser = React.lazy(() => import('../pages/users-teams/EditAppUser'))
const TeamsList = React.lazy(() => import('../pages/users-teams/TeamsList'))
const AddTeam = React.lazy(() => import('../pages/users-teams/AddTeam'))
const OffersList = React.lazy(() => import('../pages/marketing/OffersList'))
const InstructorList = React.lazy(() => import('../pages/instructors/InstructorList'))
const AddInstructor = React.lazy(() => import('../pages/instructors/AddInstructor'))
const EditInstructor = React.lazy(() => import('../pages/instructors/EditInstructor'))
const PartnersList = React.lazy(() => import('../pages/partners-clients/PartnersList'))
const AddPartner = React.lazy(() => import('../pages/partners-clients/AddPartner'))
const CourseRatings = React.lazy(() => import('../pages/courses/CourseRatings'))
const SubjectRatings = React.lazy(() => import('../pages/misc/SubjectRatings'))
const HomePageReviews = React.lazy(() => import('../pages/cms-content/HomePageReviews'))
const BannersList = React.lazy(() => import('../pages/marketing/BannersList'))
const AddBanner = React.lazy(() => import('../pages/marketing/AddBanner'))
const LeadGenerateList = React.lazy(() => import('../pages/marketing/LeadGenerateList'))
const AddLeadGenerate = React.lazy(() => import('../pages/marketing/AddLeadGenerate'))
const LeadGeneratePreview = React.lazy(() => import('../pages/marketing/LeadGeneratePreview'))
const PublicLeadForm = React.lazy(() => import('../pages/marketing/PublicLeadForm'))
const JobUpdatesList = React.lazy(() => import('../pages/jobs-careers/JobUpdatesList'))
const AddJobUpdate = React.lazy(() => import('../pages/jobs-careers/AddJobUpdate'))
const SuccessStoryList = React.lazy(() => import('../pages/cms-content/SuccessStoryList'))
const AddSuccessStory = React.lazy(() => import('../pages/cms-content/AddSuccessStory'))
const EditSuccessStory = React.lazy(() => import('../pages/cms-content/EditSuccessStory'))
const PPTList = React.lazy(() => import('../pages/cms-content/PPTList'))
const AddPPT = React.lazy(() => import('../pages/cms-content/AddPPT'))
const EditPPT = React.lazy(() => import('../pages/cms-content/EditPPT'))
const NewsList = React.lazy(() => import('../pages/cms-content/NewsList'))
const AddNews = React.lazy(() => import('../pages/cms-content/AddNews'))
const EditNews = React.lazy(() => import('../pages/cms-content/EditNews'))
const AlliedList = React.lazy(() => import('../pages/partners-clients/AlliedList'))
const AddAllied = React.lazy(() => import('../pages/partners-clients/AddAllied'))
const EditAllied = React.lazy(() => import('../pages/partners-clients/EditAllied'))
const ClientList = React.lazy(() => import('../pages/partners-clients/ClientList'))
const AddClient = React.lazy(() => import('../pages/partners-clients/AddClient'))
const EditClient = React.lazy(() => import('../pages/partners-clients/EditClient'))
const ContactQueriesList = React.lazy(() => import('../pages/misc/ContactQueriesList'))
const HireWithUsList = React.lazy(() => import('../pages/jobs-careers/HireWithUsList'))
const CouponsList = React.lazy(() => import('../pages/marketing/CouponsList'))
const AddCoupon = React.lazy(() => import('../pages/marketing/AddCoupon'))
const EditCoupon = React.lazy(() => import('../pages/marketing/EditCoupon'))
const ModuleSubModuleList = React.lazy(() => import('../pages/settings/ModuleSubModuleList'))
const BrandVideoList = React.lazy(() => import('../pages/cms-content/BrandVideoList'))
const AddBrandVideo = React.lazy(() => import('../pages/cms-content/AddBrandVideo'))
const EditBrandVideo = React.lazy(() => import('../pages/cms-content/EditBrandVideo'))
const StudentNewsList = React.lazy(() => import('../pages/cms-content/StudentNewsList'))
const StudentTestimonialList = React.lazy(() => import('../pages/cms-content/StudentTestimonialList'))
const AddStudentTestimonial = React.lazy(() => import('../pages/cms-content/AddStudentTestimonial'))
const EditStudentTestimonial = React.lazy(() => import('../pages/cms-content/EditStudentTestimonial'))
const EventCategoryList = React.lazy(() => import('../pages/events-webinars/EventCategoryList'))
const AddEventCategory = React.lazy(() => import('../pages/events-webinars/AddEventCategory'))
const EditEventCategory = React.lazy(() => import('../pages/events-webinars/EditEventCategory'))
const EventList = React.lazy(() => import('../pages/events-webinars/EventList'))
const AddEvent = React.lazy(() => import('../pages/events-webinars/AddEvent'))
const EditEvent = React.lazy(() => import('../pages/events-webinars/EditEvent'))
const UserRoleList = React.lazy(() => import('../pages/users-teams/UserRoleList'))
const AddUser = React.lazy(() => import('../pages/users-teams/AddUser'))
const MyProfile = React.lazy(() => import('../pages/settings/MyProfile'))
const ApplicationSetting = React.lazy(() => import('../pages/settings/ApplicationSetting'))
const SendNotification = React.lazy(() => import('../pages/misc/SendNotification'))
const LocationCountry = React.lazy(() => import('../pages/locations/LocationCountry'))
const LocationState = React.lazy(() => import('../pages/locations/LocationState'))
const LocationCity = React.lazy(() => import('../pages/locations/LocationCity'))
const AddLiveClass = React.lazy(() => import('../pages/live-classes/AddLiveClass'))
const EditLiveClass = React.lazy(() => import('../pages/live-classes/EditLiveClass'))
const AddCourseCategory = React.lazy(() => import('../pages/courses/AddCourseCategory'))
const EditCourseCategory = React.lazy(() => import('../pages/courses/EditCourseCategory'))
const AddCourse = React.lazy(() => import('../pages/courses/AddCourse'))
const EditCourse = React.lazy(() => import('../pages/courses/EditCourse'))
const AddTestSeriesCategory = React.lazy(() => import('../pages/test-series/AddTestSeriesCategory'))
const AddTestSeriesPackage = React.lazy(() => import('../pages/test-series/AddTestSeriesPackage'))
const PackageView = React.lazy(() => import('../pages/test-series/PackageView'))
const AddNotesSubCategory = React.lazy(() => import('../pages/notes/AddNotesSubCategory'))
const AddNotes = React.lazy(() => import('../pages/notes/AddNotes'))
const AddClass = React.lazy(() => import('../pages/live-classes/AddClass'))
const AddOffer = React.lazy(() => import('../pages/marketing/AddOffer'))
const AddSubjectRating = React.lazy(() => import('../pages/misc/AddSubjectRating'))
const AddUserReview = React.lazy(() => import('../pages/cms-content/AddUserReview'))
const QuizList = React.lazy(() => import('../pages/quiz/QuizList'))
const AddQuiz = React.lazy(() => import('../pages/quiz/AddQuiz'))

export default function AppRoutes() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-[#f5f7fa] dark:bg-[#0b0914] text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium tracking-wide">Loading...</span>
        </div>
      </div>
    }>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/form/:slug" element={<PublicLeadForm />} />
      <Route path="/leads/preview/:slug" element={<LeadGeneratePreview />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/registrations" element={<Registrations />} />
        <Route path="/registrations/course" element={<Registrations />} />
        <Route path="/registrations/certificate" element={<CertificateRequests />} />



        <Route path="/registrations/job" element={<JobRegistrations />} />
        <Route path="/registrations/event" element={<EventRegistrations />} />
        <Route path="/wishlist/course" element={<CourseWishlist />} />
        <Route path="/wishlist/test-series" element={<TestSeriesWishlist />} />
        <Route path="/wishlist/notes" element={<NotesWishlist />} />
        <Route path="/wishlist/webinar" element={<WebinarWishlist />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/leaderboard" element={<PlaceholderPage title="Test Series Leaderboard" subtitle="Coming Soon" icon="🏆" />} />
        <Route path="/wishlist" element={<PlaceholderPage title="User Wishlist" subtitle="Courses saved by students" icon="❤️" />} />
        <Route path="/batch" element={<BatchManagement />} />
        <Route path="/batch/list" element={<BatchManagement />} />
        <Route path="/batch/create" element={<BatchManagement />} />
        <Route path="/live-classes" element={<LiveClasses />} />
        <Route path="/live-classes/add" element={<AddLiveClass />} />
        <Route path="/live-classes/edit/:id" element={<EditLiveClass />} />

        <Route path="/test-series" element={<TestSeriesCategory />} />
        <Route path="/test-series/category" element={<TestSeriesCategory />} />
        <Route path="/test-series/category/add" element={<AddTestSeriesCategory />} />
        <Route path="/test-series/packages" element={<TestSeriesPackages />} />
        <Route path="/test-series/packages/add" element={<AddTestSeriesPackage />} />
        <Route path="/test-series/packages/view/:id" element={<PackageView />} />
        <Route path="/courses" element={<AllCourses />} />
        <Route path="/courses/categories" element={<CourseCategories />} />
        <Route path="/courses/categories/add" element={<AddCourseCategory />} />
        <Route path="/courses/categories/edit/:id" element={<EditCourseCategory />} />
        <Route path="/courses/all" element={<AllCourses />} />
        <Route path="/courses/all/add" element={<AddCourse />} />
        <Route path="/courses/all/edit/:id" element={<EditCourse />} />
        <Route path="/courses/view/:id" element={<CourseView />} />
        <Route path="/courses/popular" element={<PopularCourses />} />
        <Route path="/courses/recommended" element={<RecommendedCourses />} />
        <Route path="/courses/faq/:id" element={<CourseFaq />} />
        <Route path="/courses/features/:id" element={<CourseFeatures />} />
        <Route path="/courses/tools/:id" element={<CourseTools />} />
        <Route path="/courses/subjects/:id" element={<CourseSubjects />} />
        <Route path="/courses/subjects/add/:id" element={<AddCourseSubject />} />
        <Route path="/courses/topics/:subjectId" element={<CourseTopics />} />
        <Route path="/courses/topics/add/:subjectId" element={<AddCourseTopic />} />
        <Route path="/courses/test-series/:id" element={<CourseTestSeries />} />
        <Route path="/courses/test-series/add/:id" element={<AddCourseTestSeries />} />
        <Route path="/courses/training-highlights/:id" element={<CourseTrainingHighlights />} />
        <Route path="/quiz/list/:packageId" element={<QuizList />} />
        <Route path="/quiz/add/:packageId" element={<AddQuiz />} />









        <Route path="/app-users" element={<AppUsers />} />
        <Route path="/app-users/details/:id" element={<AppUserDetails />} />
        <Route path="/app-users/edit/:id" element={<EditAppUser />} />
        <Route path="/teams/all" element={<TeamsList />} />
        <Route path="/teams/add" element={<AddTeam />} />
        <Route path="/teams/edit/:id" element={<AddTeam />} />
        <Route path="/offers" element={<OffersList />} />
        <Route path="/offers/add" element={<AddOffer />} />
        <Route path="/offers/edit/:id" element={<AddOffer />} />
        <Route path="/instructors" element={<InstructorList />} />
        <Route path="/instructors/all" element={<InstructorList />} />
        <Route path="/instructors/add" element={<AddInstructor />} />
        <Route path="/instructors/edit/:id" element={<EditInstructor />} />





        <Route path="/ratings/home-page" element={<HomePageReviews />} />
        <Route path="/subject-ratings/add" element={<AddSubjectRating />} />
        <Route path="/home-page-reviews/add" element={<AddUserReview />} />
        <Route path="/banners" element={<BannersList />} />
        <Route path="/banners/add" element={<AddBanner />} />
        <Route path="/banners/edit/:id" element={<AddBanner />} />
        <Route path="/leads" element={<LeadGenerateList />} />
        <Route path="/leads/add" element={<AddLeadGenerate />} />
        <Route path="/leads/edit/:id" element={<AddLeadGenerate />} />
        <Route path="/analytics" element={<AnalyticsList />} />
        <Route path="/analytics/details/:id" element={<AnalyticsDetails />} />
        <Route path="/job-updates" element={<JobUpdatesList />} />
        <Route path="/job-updates/add" element={<AddJobUpdate />} />
        <Route path="/job-updates/edit/:id" element={<AddJobUpdate />} />
        <Route path="/success-story" element={<SuccessStoryList />} />
        <Route path="/success-story/add" element={<AddSuccessStory />} />
        <Route path="/success-story/edit/:id" element={<EditSuccessStory />} />
        
        <Route path="/placement-talks" element={<PPTList />} />
        <Route path="/placement-talks/add" element={<AddPPT />} />
        <Route path="/placement-talks/edit/:id" element={<EditPPT />} />
        
        <Route path="/news-updates" element={<NewsList />} />
        <Route path="/news-updates/add" element={<AddNews />} />
        <Route path="/news-updates/edit/:id" element={<EditNews />} />

        <Route path="/our-allied" element={<AlliedList />} />
        <Route path="/our-allied/add" element={<AddAllied />} />
        <Route path="/our-allied/edit/:id" element={<EditAllied />} />
        <Route path="/our-clients" element={<ClientList />} />
        <Route path="/our-clients/add" element={<AddClient />} />
        <Route path="/our-clients/edit/:id" element={<EditClient />} />
        <Route path="/forms/contact-query" element={<ContactQueriesList />} />
        <Route path="/forms/hire-with-us" element={<HireWithUsList />} />
        <Route path="/events/category" element={<EventCategoryList />} />
        <Route path="/events/category/add" element={<AddEventCategory />} />
        <Route path="/events/category/edit/:id" element={<EditEventCategory />} />
        <Route path="/events/list" element={<EventList />} />
        <Route path="/events/list/add" element={<AddEvent />} />
        <Route path="/events/list/edit/:id" element={<EditEvent />} />
        <Route path="/master/coupons" element={<CouponsList />} />
        <Route path="/master/coupons/add" element={<AddCoupon />} />
        <Route path="/master/coupons/edit/:id" element={<EditCoupon />} />
        <Route path="/master/module-sub-module" element={<ModuleSubModuleList />} />
        <Route path="/master/brand-video" element={<BrandVideoList />} />
        <Route path="/master/brand-video/add" element={<AddBrandVideo />} />
        <Route path="/master/brand-video/edit/:id" element={<EditBrandVideo />} />
        <Route path="/master/student-news" element={<StudentNewsList />} />
        <Route path="/master/student-testimonial" element={<StudentTestimonialList />} />
        <Route path="/master/student-testimonial/add" element={<AddStudentTestimonial />} />
        <Route path="/master/student-testimonial/edit/:id" element={<EditStudentTestimonial />} />
        <Route path="/user-role" element={<UserRoleList />} />
        <Route path="/user-role/add" element={<AddUser />} />
        <Route path="/user-role/edit/:id" element={<AddUser />} />
        <Route path="/general-setting/my-profile" element={<MyProfile />} />
        <Route path="/general-setting/application" element={<ApplicationSetting />} />
        <Route path="/general-setting/send-notification" element={<SendNotification />} />
        <Route path="/location-setting/country" element={<LocationCountry />} />
        <Route path="/location-setting/state" element={<LocationState />} />
        <Route path="/location-setting/city" element={<LocationCity />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<PlaceholderPage title="404 — Not Found" subtitle="The page you're looking for doesn't exist." icon="🔍" />} />
      </Route>
    </Routes>
    </Suspense>
  )
}
