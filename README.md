http://safe-food.herokuapp.com - Prototype<br>
https://github.com/itgfirm/safe-food - Repository
  
###Introduction
ITG is an innovative woman-owned small business that has since inception has adopted Agile scrum as its methodology to deliver complex, cloud-enabled, mobile-ready, enterprise solutions. Our customer portfolio includes GSA where we have developed systems in an agile manner including G-REX and EASi.
 
###Assembling the Team
Upon review of the BPA, the BPA response team rapidly self-organized and met to determine roles. We decided to work on the requirements for Pool 2 and chose the api.fda.gov/food/enforcement API because it allowed us to demonstrate a wider subset of our expertise including search and data analytics. To execute on the requirements we mobilized resources from our highly qualified pool of technical professionals and developed a Project Charter.  Our Product Owner was selected based on experience with similar programs and understanding of the domain. Our team is comprised of a Scrum Master, and additional cross functional roles that include a solution architect, front-end developers, back-end developer, DevOps engineer, tester, and UI/UX designer.
 
As customary, ITG’s Chief Information Security Officer (CISO) was engaged during Backlog Development to detail security requirements including collected information, storage, data usage and role based access.
 
###Selecting the Technologies
Based on the requirements of the project, we selected a modern technology stack (Javascript), and leveraged open source and managed services as much as possible to ensure success.  In addition to closely following the U.S. Digital Services Playbook, we also implemented full DevOps automation including Continuous Deployment.
 
To meet the requirements our Solution Architect selected:
- AngularJS, RequireJS, and Karma
- Node.js, LoopBack, Mocha, and Grunt
- Travis CI and SauceLabs to implement our CI system including automated tests
- Heroku as our deployment environment, as well as New Relic and Papertrail for monitoring

###Agile Execution
Our prototype was developed using our proven Agile Scrum methodologies (Figure 1) to deliver an application that provides informative data to citizens detailing food safety recalls.

![Agile and DevOps graphic](https://github.com/itgfirm/safe-food/blob/master/Documentation/ITG%20DevOps.png)

We held a Backlog Development Meeting, led by the Product Owner. The Product Owner developed stories with acceptance criteria, and the Scrum Master led the team through a grooming session to assign points to stories. Our stories included wireframes focused on human-centered design principles by our UX designer and test scripts from our QC specialists that ensured alignment with acceptance criteria, feature quality and industry accepted mobile responsive apps. Our architects developed the underpinning solution and data architectures and ensured alignment with GSA Enterprise Architecture (EA). Our target was to develop an evolutionary tool rather than a throw-away prototype.
 
We held a Sprint Planning Meeting to identify the Sprint Goal and assign stories to Sprint. We used the Agile Board in JIRA to track work, velocity and progress. We began the sprint, and held daily standups.

Although our team was geographically dispersed, we ensured seamless collaboration, coordination, and governance through daily scrums and use of Slack, providing us with transparency and an integrated view of the progress.
 
Our team employed additional tools to manage the development of this prototype.  The team used JIRA, a tool used for all projects at ITG, to plan and track the sprint, and capture progress and clarifications on User Stories and acceptance criteria. Slack was the team’s information hub for all notifications and conversations outside of JIRA. The technical team relied on the DevOps automation that was customized to meet project needs through leveraging Travis CI configurations, Grunt scripts, deploy scripts and test automation.
 
Our Scrum Master monitored development progress and reallocated priorities as needed with the Product Owner who was subscribed to the Slack dashboard to provide immediate feedback enabling the team to work in 2-4 hour increments delivering functional stories.
 
At the end of each week, work was presented to the Product Owner. The Product Owner validated that each acceptance criteria was met. Any items outside of scope of the stories or acceptance criteria were added to the backlog. Also, our Team discussed what worked and what didn’t during the day enabling the Scrum Master to resolve issues through continual process improvement that increased velocity to meet our tight deadline. Upon completion of the safeFood project we held a meeting to discuss lessons learned.
 
As demonstrated in the provided [Attachment E](https://github.com/itgfirm/safe-food/raw/master/Evidence/Attachment%20E%20Approach%20Criteria%20Evidence_ITG.xlsx), our safeFood app meets all criteria required for Pool 2. Our application represents the confluence of ITG’s highly experienced team, proven Agile Scrum practices, DevOps, tools experience, and federal standards.
