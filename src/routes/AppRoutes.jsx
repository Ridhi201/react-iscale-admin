import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import MainLayout from '../layouts/MainLayout'
import Dashboard from '../pages/dashboard/Dashboard'
import Registrations from '../pages/misc/Registrations'
import Analytics from '../pages/dashboard/Analytics'
import Settings from '../pages/settings/Settings'
import PlaceholderPage from '../pages/misc/PlaceholderPage'
import Login from '../pages/auth/Login'
import BatchManagement from '../pages/live-classes/BatchManagement'
import LiveClasses from '../pages/live-classes/LiveClasses'
import TestSeriesCategory from '../pages/test-series/TestSeriesCategory'
import TestSeriesPackages from '../pages/test-series/TestSeriesPackages'
import Logout from '../pages/auth/Logout'
import LeaderBoard from '../pages/dashboard/LeaderBoard'
import CertificateRequests from '../pages/misc/CertificateRequests'
import TestSeriesRegistrations from '../pages/test-series/TestSeriesRegistrations'
import NotesRegistrations from '../pages/notes/NotesRegistrations'
import WebinarRegistrations from '../pages/events-webinars/WebinarRegistrations'
import JobRegistrations from '../pages/jobs-careers/JobRegistrations'
import EventRegistrations from '../pages/events-webinars/EventRegistrations'
import CourseWishlist from '../pages/courses/CourseWishlist'
import TestSeriesWishlist from '../pages/test-series/TestSeriesWishlist'
import NotesWishlist from '../pages/notes/NotesWishlist'
import WebinarWishlist from '../pages/events-webinars/WebinarWishlist'
import CourseCategories from '../pages/courses/CourseCategories'
import AllCourses from '../pages/courses/AllCourses'
import PopularCourses from '../pages/courses/PopularCourses'
import RecommendedCourses from '../pages/courses/RecommendedCourses'
import CourseFaq from '../pages/courses/CourseFaq'
import CourseFeatures from '../pages/courses/CourseFeatures'
import CourseTools from '../pages/courses/CourseTools'
import CourseSubjects from '../pages/courses/CourseSubjects'
import AddCourseSubject from '../pages/courses/AddCourseSubject'
import CourseTopics from '../pages/courses/CourseTopics'
import AddCourseTopic from '../pages/courses/AddCourseTopic'
import CourseTestSeries from '../pages/courses/CourseTestSeries'
import AddCourseTestSeries from '../pages/courses/AddCourseTestSeries'
import CourseTrainingHighlights from '../pages/courses/CourseTrainingHighlights'
import NotesCategory from '../pages/notes/NotesCategory'
import NotesSubCategory from '../pages/notes/NotesSubCategory'
import AllNotes from '../pages/notes/AllNotes'
import ClassesList from '../pages/live-classes/ClassesList'
import AppUsers from '../pages/users-teams/AppUsers'
import OffersList from '../pages/marketing/OffersList'
import InstructorList from '../pages/instructors/InstructorList'
import AddInstructor from '../pages/instructors/AddInstructor'
import EditInstructor from '../pages/instructors/EditInstructor'
import PartnersList from '../pages/partners-clients/PartnersList'
import AddPartner from '../pages/partners-clients/AddPartner'
import CourseRatings from '../pages/courses/CourseRatings'
import SubjectRatings from '../pages/misc/SubjectRatings'
import HomePageReviews from '../pages/cms-content/HomePageReviews'
import BannersList from '../pages/marketing/BannersList'
import AddBanner from '../pages/marketing/AddBanner'
import LeadGenerateList from '../pages/marketing/LeadGenerateList'
import AddLeadGenerate from '../pages/marketing/AddLeadGenerate'
import AnalyticsList from '../pages/dashboard/AnalyticsList'
import JobUpdatesList from '../pages/jobs-careers/JobUpdatesList'
import AddJobUpdate from '../pages/jobs-careers/AddJobUpdate'
import SuccessStoryList from '../pages/cms-content/SuccessStoryList'
import AddSuccessStory from '../pages/cms-content/AddSuccessStory'
import PlacementTalksList from '../pages/cms-content/PlacementTalksList'
import AddPlacementTalk from '../pages/cms-content/AddPlacementTalk'
import AlliedList from '../pages/partners-clients/AlliedList'
import AddAllied from '../pages/partners-clients/AddAllied'
import ClientList from '../pages/partners-clients/ClientList'
import AddClient from '../pages/partners-clients/AddClient'
import NewsList from '../pages/cms-content/NewsList'
import AddNews from '../pages/cms-content/AddNews'
import ContactQueriesList from '../pages/misc/ContactQueriesList'
import HireWithUsList from '../pages/jobs-careers/HireWithUsList'
import CouponsList from '../pages/marketing/CouponsList'
import AddCoupon from '../pages/marketing/AddCoupon'
import ModuleSubModuleList from '../pages/settings/ModuleSubModuleList'
import BrandVideoList from '../pages/cms-content/BrandVideoList'
import StudentNewsList from '../pages/cms-content/StudentNewsList'
import StudentTestimonialList from '../pages/cms-content/StudentTestimonialList'
import EventCategoryList from '../pages/events-webinars/EventCategoryList'
import AddEventCategory from '../pages/events-webinars/AddEventCategory'
import EventList from '../pages/events-webinars/EventList'
import AddEvent from '../pages/events-webinars/AddEvent'
import UserRoleList from '../pages/users-teams/UserRoleList'
import AddUser from '../pages/users-teams/AddUser'
import MyProfile from '../pages/settings/MyProfile'
import ApplicationSetting from '../pages/settings/ApplicationSetting'
import SendNotification from '../pages/misc/SendNotification'
import LocationCountry from '../pages/locations/LocationCountry'
import LocationState from '../pages/locations/LocationState'
import LocationCity from '../pages/locations/LocationCity'
import AddLiveClass from '../pages/live-classes/AddLiveClass'
import EditLiveClass from '../pages/live-classes/EditLiveClass'
import AddCourseCategory from '../pages/courses/AddCourseCategory'
import EditCourseCategory from '../pages/courses/EditCourseCategory'
import AddCourse from '../pages/courses/AddCourse'
import EditCourse from '../pages/courses/EditCourse'
import AddTestSeriesCategory from '../pages/test-series/AddTestSeriesCategory'
import AddTestSeriesPackage from '../pages/test-series/AddTestSeriesPackage'
import AddNotesCategory from '../pages/notes/AddNotesCategory'
import AddNotesSubCategory from '../pages/notes/AddNotesSubCategory'
import AddNotes from '../pages/notes/AddNotes'
import AddClass from '../pages/live-classes/AddClass'
import AddOffer from '../pages/marketing/AddOffer'
import AddSubjectRating from '../pages/misc/AddSubjectRating'
import AddUserReview from '../pages/cms-content/AddUserReview'
import QuizList from '../pages/quiz/QuizList'
import AddQuiz from '../pages/quiz/AddQuiz'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
        <Route path="/registrations/test-series" element={<TestSeriesRegistrations />} />
        <Route path="/registrations/notes" element={<NotesRegistrations />} />
        <Route path="/registrations/webinar" element={<WebinarRegistrations />} />
        <Route path="/registrations/job" element={<JobRegistrations />} />
        <Route path="/registrations/event" element={<EventRegistrations />} />
        <Route path="/wishlist/course" element={<CourseWishlist />} />
        <Route path="/wishlist/test-series" element={<TestSeriesWishlist />} />
        <Route path="/wishlist/notes" element={<NotesWishlist />} />
        <Route path="/wishlist/webinar" element={<WebinarWishlist />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/wishlist" element={<PlaceholderPage title="User Wishlist" subtitle="Courses saved by students" icon="❤️" />} />
        <Route path="/batch" element={<BatchManagement />} />
        <Route path="/batch/list" element={<BatchManagement />} />
        <Route path="/batch/create" element={<BatchManagement />} />
        <Route path="/live-classes" element={<LiveClasses />} />
        <Route path="/live-classes/add" element={<AddLiveClass />} />
        <Route path="/live-classes/edit/:id" element={<EditLiveClass />} />
        <Route path="/webinar" element={<PlaceholderPage title="Webinar" subtitle="Manage webinar events" icon="🎤" />} />
        <Route path="/test-series" element={<TestSeriesCategory />} />
        <Route path="/test-series/category" element={<TestSeriesCategory />} />
        <Route path="/test-series/category/add" element={<AddTestSeriesCategory />} />
        <Route path="/test-series/packages" element={<TestSeriesPackages />} />
        <Route path="/test-series/packages/add" element={<AddTestSeriesPackage />} />
        <Route path="/courses" element={<AllCourses />} />
        <Route path="/courses/categories" element={<CourseCategories />} />
        <Route path="/courses/categories/add" element={<AddCourseCategory />} />
        <Route path="/courses/categories/edit/:id" element={<EditCourseCategory />} />
        <Route path="/courses/all" element={<AllCourses />} />
        <Route path="/courses/all/add" element={<AddCourse />} />
        <Route path="/courses/all/edit/:id" element={<EditCourse />} />
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
        <Route path="/notes" element={<AllNotes />} />
        <Route path="/notes/category" element={<NotesCategory />} />
        <Route path="/notes/category/add" element={<AddNotesCategory />} />
        <Route path="/notes/sub-category" element={<NotesSubCategory />} />
        <Route path="/notes/sub-category/add" element={<AddNotesSubCategory />} />
        <Route path="/notes/all" element={<AllNotes />} />
        <Route path="/notes/all/add" element={<AddNotes />} />
        <Route path="/classes" element={<ClassesList />} />
        <Route path="/classes/add" element={<AddClass />} />
        <Route path="/app-users" element={<AppUsers />} />
        <Route path="/offers" element={<OffersList />} />
        <Route path="/offers/add" element={<AddOffer />} />
        <Route path="/instructors" element={<InstructorList />} />
        <Route path="/instructors/all" element={<InstructorList />} />
        <Route path="/instructors/add" element={<AddInstructor />} />
        <Route path="/instructors/edit/:id" element={<EditInstructor />} />
        <Route path="/partners" element={<PartnersList />} />
        <Route path="/partners/all" element={<PartnersList />} />
        <Route path="/partners/add" element={<AddPartner />} />
        <Route path="/ratings/course" element={<CourseRatings />} />
        <Route path="/ratings/subject" element={<SubjectRatings />} />
        <Route path="/ratings/home-page" element={<HomePageReviews />} />
        <Route path="/subject-ratings/add" element={<AddSubjectRating />} />
        <Route path="/home-page-reviews/add" element={<AddUserReview />} />
        <Route path="/banners" element={<BannersList />} />
        <Route path="/banners/add" element={<AddBanner />} />
        <Route path="/leads" element={<LeadGenerateList />} />
        <Route path="/leads/add" element={<AddLeadGenerate />} />
        <Route path="/analytics" element={<AnalyticsList />} />
        <Route path="/job-updates" element={<JobUpdatesList />} />
        <Route path="/job-updates/add" element={<AddJobUpdate />} />
        <Route path="/job-updates/edit/:id" element={<AddJobUpdate />} />
        <Route path="/success-story" element={<SuccessStoryList />} />
        <Route path="/success-story/add" element={<AddSuccessStory />} />
        <Route path="/placement-talks" element={<PlacementTalksList />} />
        <Route path="/placement-talks/add" element={<AddPlacementTalk />} />
        <Route path="/our-allied" element={<AlliedList />} />
        <Route path="/our-allied/add" element={<AddAllied />} />
        <Route path="/our-clients" element={<ClientList />} />
        <Route path="/our-clients/add" element={<AddClient />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/news/add" element={<AddNews />} />
        <Route path="/forms/contact-query" element={<ContactQueriesList />} />
        <Route path="/forms/hire-with-us" element={<HireWithUsList />} />
        <Route path="/events/category" element={<EventCategoryList />} />
        <Route path="/events/category/add" element={<AddEventCategory />} />
        <Route path="/events/list" element={<EventList />} />
        <Route path="/events/list/add" element={<AddEvent />} />
        <Route path="/master/coupons" element={<CouponsList />} />
        <Route path="/master/coupons/add" element={<AddCoupon />} />
        <Route path="/master/module-sub-module" element={<ModuleSubModuleList />} />
        <Route path="/master/brand-video" element={<BrandVideoList />} />
        <Route path="/master/student-news" element={<StudentNewsList />} />
        <Route path="/master/student-testimonial" element={<StudentTestimonialList />} />
        <Route path="/user-role" element={<UserRoleList />} />
        <Route path="/user-role/add" element={<AddUser />} />
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
  )
}
