<h1>Testing</h1>
<p>This branch is for testing purposes. Once features on a particular branch are completed, developers should create a pull request to merge into this branch. If the pull request is approved and successful, a build is automatically created by Vercel and deployed at <a href="https://intellislides-git-development-raamzeez.vercel.app/">https://intellislides-git-development-raamzeez.vercel.app/</a>. Users must authenticate with Vercel to view the build. This branch is used as a preview branch to test and interact with the features that are going to be released with the next version of IntelliSlides. Once all developers agree that the features are working as expected, it will then be merged into the main branch by the admins.

To get started, make sure Node is installed:

For Windows, you can install Node directly from the Node.js Website:
```
https://nodejs.org/en
```

For Linux users, you can also install from the website, but if you have Fedora/Arch Linux, you can use: 
```bash
sudo dnf install npm
```

If you want to make presentations and SAVE them, you will need to contact https://github.com/Raamzeez for database access. You can also make your own via MongoDB and supply your own parameters:
```
GOOGLE_SEARCH_KEY=
GOOGLE_WEB_CLIENT_ID=
GOOGLE_WEB_CLIENT_SECRET=
OPENAI_API_KEY=
SENDGRID_API_KEY=
MONGODB_URI=
CX=
```

To start server:
```bash
npm start dev
```

How to use the website:
Landing page is a pretty standard UI. The top right has a "Launch Application" button. Click that to go to the application page.

Topic: 
```
What is your presentation about?

From the website:
This is where you will enter the topic of your presentation. Please be as specific as possible, as this ensures the accuracy of the presentation. For example, the topic "The History of Tesla Motors" is much better than simply writing "Tesla", as the program clearly knows that it needs to discuss the history of the company called "Tesla Motors" instead of something else, such as the life of the individual known as Nikola Tesla.
```

Category:
```
Choose an option that best categorizes what you want your topic and presentation to relate to. This will ensure the accuracy of the presentation. For example, if your topic is "The Space Shuttle Columbia Disaster", choosing the category "Place" may make the presentation discuss the location of the incident, where as choosing the category "Event" may make the presentation discuss the events that unfolded. Select "Auto" if you want the program to choose what it believes is the most relevant category to the topic.
```

Title:
```
Title of presentation that shows up on the first page.
```

Subtitle:
```
The small blurb underneath the title. This is typically where you write your name and other collaborators' names.
```

Slide Count:
```
How many slides should the presentation be?

Try to keep it at a reasonable amount as the time scales with number of slides.
```
</p>
