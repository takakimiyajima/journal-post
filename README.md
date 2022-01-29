# Takaki Miyajima's Thinkific Multi-User Journal Assignment

## Getting Started

### 1. Get to know project tech stack

This simple project is a starting point for your take-home test. It is built with the following technologies:

- [React](https://reactjs.org/), a JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/), a frontend framework for server-side rendering, easy routing, serverless RESTful API
- [Prisma](https://www.prisma.io/), a database ORM for Node.js
  - Scaffolding is set up for SQLite
  - You are free to use other databases of your choice

### 2. Install npm dependencies

```
yarn
```

### 3. Create .env file

```
cp .env.example .env
```

### 4. Prepare DB

Create a local SQLite database and run migrations.

```
npx prisma migrate dev --name init
```

Seed the database with the sample data from [`prisma/seed.js`](./prisma/seed.js).

```
npx prisma db seed --preview-feature
```

### 5. Start the app

```
yarn dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

## Submission

Update this README file by answering the questions below.

### Date Or Reflection

> The date you're submitting this.
 - 19th January 2022

### Location of deployed application (not necessary for Junior Engineers)

 > Please provide the url where we can find and interact with your running application.
 -  I deployed to my Heroku
    - https://online-jurnal.herokuapp.com/

### Instructions to run assignment locally

> Please provide us with the necessary instructions to run your solution if it is implemented with technologies different from the starting repo.
- I used the starting repo. But I'd like to share with you just in case below
  - I used a mysql on Heroku and Local and Dev both use the same mysql. I have already migrated this app's schemas. So you don't need to migrate this time.

### Time spent

> How much time did you spend on the assignment? Normally, this is expressed in hours.

- 16 h

### Assumptions made

>Use this section to tell us about any assumptions that you made when creating your solution.

- This online journal is a service that can be viewed by everyone who accesses it, and there is an assumption that it will be publicly available, so we implemented it in SSR from an SEO perspective.

- This time, I implemented it without worrying about the User table because I wanted to be able to comment anonymously.

- 

### Shortcuts/Compromises made

>If applicable. Did you do something that you feel could have been done better in a real-world application? Please let us know.

- The division of responsibility for each file could have been done better.
For example, this time, a fetching is done in a component file called "JournalIdScreen.tsx", but I think it should have been combined into a file related to the API.

- The top page (list of journals) and the journal details screen have similar designs, but I've separated them this time. I should have thought of a more versatile design here and made it a generic component, but I didn't think I should spend time on it, so I compromised.

- I used next-auth to enable oAuth, but I didn't use the User table that defines the schema.
When this is actually used in production, of course, we will need to use it.

- I used MySQL, but when I tried to create a migration file from local, I got an error and it didn't work. I haven't solved the problem yet, but this time I compromised with "prisma db push" to reflect the schema in the DB.

- DBs for Local and Dev should be separated.

### Assume your application will go into production...

#### 1) What would be your approach to ensuring the application is ready for production (testing)?

- Depending on the team, prepare multiple development environments and two stage environments. These environments should have the same specs as the production environment. (The development environment, if possible. The stage environment is absolutely necessary.)  
If you have only one development environment, it will be difficult when you have many things to release, so prepare multiple environments so that you can check each implementation smoothly.
The stage environment is used to restore data equivalent to the production environment, and to check if the operation before release is really OK.

- CI/CD to check for lint, etc.

- Predict peak traffic, perform load testing based on that, and then determine the performance of the production environment.

- Review with the team how and when it is safe to deploy.

#### 2) How would you ensure a smooth user experience as 1000’s of users start using your app simultaneously?

- Measure the loading speed of each page display to see if any delays are occurring.
  - If the cause is in the code, consider a refactor.
  - If there is nothing to fix in terms of code, and the problem seems to be in the server specs, consider increasing the specs or using a load balancer.

#### 3) What key steps would you take to ensure application security?

- Configure the contents of the production DB so that they cannot be manipulated directly.
- Personal information is masked and not stored in webStorage.
- Countermeasures against attacks from malicious users (e.g., XXS) should be reviewed by multiple people to ensure thoroughness.
- Set httponly to the cookie.

### What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.
- Basically, what I wrote in the "Assumptions made" section did not get to be considered due to time constraints.
- I'm using TwitterAPI with Next-AUTH, but it's not available for Local. If you want to check, please try on Heroku. 
- I was slightly confused as to how much I should elaborate on the design.
It may not be something to be too concerned about, but this is where I spent some time.  
There is also the optional issue of re-examining the UI, which may be a little difficult, but if we could have had a simple design prepared beforehand, the implementation may have been a little smoother.

### Other information about your submission that you feel it's important that we know if applicable.

- It has already been mentioned above

### Your feedback on this technical challenge

as mentioned above
I was a little confused as to how much I should do.  
For example,
- How much should I elaborate on the design?
- If I'm going to implement this feature, I think I need this feature, but it's not written in the instructions.
  - For example, the signup for oAuth is written, but the signout is not. I've added signout because I think it's easier to check if it's there.

I'm afraid I have a detail, but I thought it was easier to determine if it is written down.


