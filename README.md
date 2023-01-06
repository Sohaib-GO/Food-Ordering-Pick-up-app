# Food Ordering Pick up app

This imaginery restaurant allows users to login and register an account and order items from the menu. 
Once checkout has checked out user will receive a text message to confirm the order and time. Front end is done with tailwind  and scss. The backend is made with NodeJS, express and EJS. The database is created with postgresql. Twilio is used as the API for texts between clients and admin.


## Dependencies

1. Node 10.x or above
2. NPM 5.x or above
3. PG 6.x
4. express
5. cookieSession
6. node-postgresql
7. morgan
8. twilio

## Getting Started

1. [Create](https://github.com/Sohaib-GO/Project-02) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Run the scheme and seeds files to create database.
3. rest date base by running `npm run db:reset`.
4. Install dependencies using the `npm install` command.
5. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
6. Go to <http://localhost:8080/homepage> in your browser.


## ScreenShots 
![Screenshot homepage](https://github.com/Sohaib-GO/Project-02/blob/master/img/home_page.png?raw=true)
![Screenshot of checkout Page](https://github.com/Sohaib-GO/Project-02/blob/master/img/checkout.png?raw=true)
![Screenshot of Login Page](https://github.com/Sohaib-GO/Project-02/blob/master/img/login.png?raw=true)
![Screenshot of Admin Orders Page](https://github.com/Sohaib-GO/Project-02/blob/master/img/admin_orders.png?raw=true)
![Screenshot of Database ERV](https://github.com/Sohaib-GO/Project-02/blob/master/img/Database-ERD.png?raw=true)


## How to use Application
1. Load `localhost:8080/homepage` onto your browswer.
2. select register on the top right hand corner.
3. place information into register form (NOTE please submit phone number with this formating `+16041112222`)
4. Feel free to pick whatever you like from the menu and hit submit 
5. The assigned admin number will receive a text message with your order
5. Load `localhost:8080/account/orders` and submit what time you'd like provide to the order
6. you should then receive a text message with your order confirmation!
