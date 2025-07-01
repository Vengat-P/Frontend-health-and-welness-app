# Health and Wellness App Frontend

## Overview

Develop an app focused on health and wellness with features for fitness tracking, nutrition planning, and mental health support.

## Tech Stack

- **ReactJs** for structure
- **TailwindCss** for styling
- **Axios** to Fetch API data
- **react-Toastify** to send messages in frontend(for user friendly)
- **daisyui** for modal
- **flowbite** for icons
- **Chartjs** to visual chart
- **React-Router-dom** for acessing routers(pacakge)
- **recat-chartjs-2** for chart visualization
- **VSCode** for development
- **JavaScript** for applying logics

## Logics

- **step 1 -** create new react application ,complete the file cleaning and install the required packages like tailwind css ,chart js,react router dom,daisy ui and flowbite .then create components footer, navbar file and pages home,about,fitness,fitnesslog,forgotpassword,frontpage,goal,home,login,notfound,nutrition,nutritionlogs,personaldetails,register,resetpassword and setgoal.

- **step 2 -** create use context hook to handle some functions and hook state managemnet. create userprovider and pass children prop as a parameter create user usestate to store user token in localstorage.and login function and logout function on these funstion setuser in login funstion setuser as userdata and logout function setuser will be null and remove details from localstorage using remove item , and use Effect state within array pass user to re render every time user update changing. in return create usercontext.provider with wraping children and passing all required states and function inside this to access anywhere in the application.now go to main jsx and warp app component inside of userProvider and also inside of browser router

- **step 3 -** In app component inside of return first make one div for navbar component and create a routes inside of this create to route with path and pages for all pages . and then one div for footer, In navbar and footer i added required link path to redriect respected pages and set conditional rendering for when user not login show diiferent links in nav bar else showing required link paths.

- **Step4**

- **Register** create use state hooks for email,name,password and show password state to store and send to backend.In handle register function send our states as a payload to backend by using axios post method. then navigate to login page. all set value function in form directly getting values from onchange function in form . showpassword state is used to user can see their password as text by clicking that otherwise it will be hide only for this also same inline function for setShowPassword.

- **Login** import login function from usercontext.then same like register but required only email and password. create use state hooks for email,password and show password state to store and send to backend.In handle submit function send our states as a payload to backend by using axios post method.in login functoin pass userdata after getting from login and then setuser in localstorage using setitem method . after sending datas clear the states. all set value function in form directly getting values from onchange function in form . here also showpassword same function. here we cand add forgot-password link to navigate forgot-password page. for logout function import logout function in nav bar and onclick function for logout button will use logout function

- **forgotpassword** IN forgot password page we need to send our email to get reset password link fro backend. so create only email usestate and pass that directly in axios post method . after sending mail navigate to login page

- **resetpassword** in reset password page set state for password and showpassword to send new password to backend. to change password we need id and token from backend . in our mail that link has id and token we need desturcutre link by using useParams method to get id and token from link and pass that id and token in axios post link

- **Step5**
- **personalDetails**to edit or update personal detail in home page click my info button thatwill navigatepersonaldetails page. in personaldetails page passing user through usecontext and create status and userdata usestates hook. default status is true this will used to conditional render while on click edit setstaus will change false so we can saw the form with our details we can enter all details.in use effect call fetch data function and in array pass user. in fetch data function using axios get method with backend api and passing in headers-Authorization- bearer token of user what we stored in localstorage.and set userdata is response of getting data.if we need to edit click button form will show with our details by using put method of axios we can update new data of user.

- **Step6**
- **FitnessLog -Create** to create fitness log in home page i add setfitness log butto to navigate fitnesspage.in fitness page create userdata usestate to collect required inputs from user by using form. in form onchange function will set user data onsubmit function will send entered userdata to backend with user data and passing in headers-Authorization- bearer token of user what we stored in localstorage. once its created it will redirect /home page.

- **FitnessLog -Fetch** in fitnesslog page create fitnesslogs array usestate to storefitnesslogs and newfitnesslog usestate to store updated data of fitness log and user from use context to pass token while axios functions.and use effect hooks carry the fetchdata function in array pass user while user update rerender happens.
  in fetch data function inside of try catch block in try block get details from backend using get method of axios passsing token . and store that response in fitnesslogarray. by using this array in return using map method to display all logs with edit and delete button for each logs.both buttons are used to edit or delete selected log.

- **FitnessLog -Edit and Update** in edit button passing log id as parameter to get clicked log data. and open modal to edit required data.and using get method of single log data using id (passing /id at end) and store that data in newfitnesslog object.now if we click edit we will get the clicked log data in to modal form. in this form we setnewfitnesslog using onchange function of each inputs forstored new data in newfitnesslog object. in on submit button pass handle update function in that function send new data to backend using post method of axios for this also need token so same headers passing method used.

- **FitnessLog -delete** IN delete button passing log id to delete clicked log details.by using delete method of axios to delete clicked log data in backend . for this also pass user token .and to show remaining logs use fillter method and pass condition logs id which is not equal to will sotre filterlog . now setfitnesslog array fillter logs

- **Step7**
- **Nutrition Log** for nutrition log also same like fitness log so i did same process for nutrition log did same crud function to interact with related backend api

- **Step8**
- **Goal Log** for goal log also same like fitness log so i did same process for nutrition log did same crud function to interact with related backend api .

- **Step9**
- **Chartjs** in home page create startdate,enddate,datesrange and chartdata usestate hook.datesrange will be array and startdate,enddate will be null. chart data will be object in fields labels is empty array and data set array passing two objects one is for calories burn and another one calories taken. first need to set date range so in return i create form inputs for select dates and search button .onchange function will set start date and end date. onsubmit function pass if condition if startdate and enddate both have values then create empty array name is dates and set current date is start date and set while function for currentdate lessthan or equal to end date if condition satisfied push currnet date into dates array using push method. and change current date + 1 using setdate and getdate method once condition closed setdatesrange as dates array . now in fetchdata function setchart data labels array will be this datesrange array to get all dates from date range using map method and convert to isostring and split time o method this will give only date.now in labels we have selected range dates from input form. in data sets array first object is calories burn to match lables dates range and fitnesslog array first using map method for datesrange array then declare variable match and map fitnesslog and pass if condition if logs.created at and date if both matchs retuen calories for if function. in return of datesrange map function use rduce method for this match variable to sum each date calories + user rest mode bmr .
  In second object calories taken this also same for previous insted of fitnesslogs using nutrition logs and return reduced calories for each dates. now we can visualize cahrt by selecting dates range.
- **Step10**
- **Loading** set loading states for all required backend data fetch time delay.

## How to Use

- **step-1 -** first register with your details. then login by ur id and password.once loggin succefull you will redirect home page.in home page you can see cart and myinfo,fitnesslog,nutritionlog and setgoal buttons.

- **step-2 -**click my info button to saw your personal details . to edit your details click edit and update.weight ,height,age required must to calculate your rest mode bmr so enter all details.

- **step-3 -** to enter fitness log details click fitnesslog button there you can enter fitnesslog details. if you want to see logs click fitnesslogs in navbar you can able to see logs with edit and delete button. you can edit if you want and you can delete if you dont want .

- **step-4 -**to enter nutrition log details click nutritionlog button there you can enter nutritionlog details. if you want to see logs click nutritionlogs in navbar you can able to see logs with edit and delete button. you can edit if you want and you can delete if you dont want .

- **step-5 -** to set goals click goal button and select dates and enter description goal name. in backend set automatic object generate with dates range using cron package. once you set goal every day cron will set autogoal for you within selected dates only for that goals you can updtae complete or pending for main goal you can edit name and status .dates youcant edit for you consistance purpose disabled this date edit option. if you want to delete just delete main goal

- **step-6 -** to see your performance through chart select dates range and click search . you can see selected dates values of your calories burn and calories taken. calories burn will available for everyday because i attached your rest mode bmr for every day.calories taken will show only you entered data from nutrition logs .
  to mange daily fitness mange these equally if you want to weight lose take less calories and burn more calories through exercises but wisely. if you want weight gain do exercises and take more calories as intake morethan calories burn wisely.

## Features

- Responsive Design
- Clean and Minimalistic Layout
- Routing for separate pages in single page

## Demo

- https://fit2go.netlify.app/

## Authors

- [@ Vengat p](https://github.com/Vengat-P)
