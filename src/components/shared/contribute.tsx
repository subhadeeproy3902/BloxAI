import React from "react";

const Contributing = () => {
  return (
    <div className="min-h-[40rem] w-full pt-7 rounded-md flex justify-center flex-col antialiased relative overflow-hidden">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-foreground/75">
          Contributing Guidelines
        </h1>
        <p className="mb-4 text-muted-foreground">
          This documentation contains a set of guidelines to help you during the contribution process.
          We are happy to welcome all the contributions from anyone willing to improve/add new scripts to this project.
          Thank you for helping out and remember, no contribution is too small.
        </p>
        <p className="mb-4 text-muted-foreground">
          Please note we have a <a href="CODE_OF_CONDUCT.md" className="hover:underline">code of conduct</a>; please follow it in all your interactions with the project.
        </p>
        
        <h2 className="text-2xl font-bold mb-4 text-foreground/75">
          Need some help regarding the basics?
        </h2>
        <p className="mb-4 text-muted-foreground">
          You can refer to the following articles on basics of Git and Github and also contact the Project Mentors,
          in case you are stuck:
        </p>
        <ul className="mb-4 list-disc list-inside text-muted-foreground">
          <li><a href="https://help.github.com/en/github/getting-started-with-github/fork-a-repo" className="hover:underline">Forking a Repo</a></li>
          <li><a href="https://help.github.com/en/desktop/contributing-to-projects/creating-an-issue-or-pull-request" className="hover:underline">Cloning a Repo</a></li>
          <li><a href="https://opensource.com/article/19/7/create-pull-request-github" className="hover:underline">How to create a Pull Request</a></li>
          <li><a href="https://towardsdatascience.com/getting-started-with-git-and-github-6fcd0f2d4ac6" className="hover:underline">Getting started with Git and GitHub</a></li>
          <li><a href="https://docs.github.com/en/get-started/start-your-journey/git-and-github-learning-resources" className="hover:underline">Learn GitHub from Scratch</a></li>
        </ul>
        
        <h2 className="text-2xl font-bold mb-4 text-foreground/75">
          Contribution Steps
        </h2>
        <ol className="mb-4 list-decimal list-inside text-muted-foreground">
          <li>Fork <a href="https://github.com/subhadeeproy3902/BloxAI.git" className="hover:underline">this</a> repository.</li>
          <li>Clone your forked copy of the project.
            <pre className="bg-gray-800 text-white p-2 rounded">git clone https://github.com/&lt;your_user_name&gt;/BloxAI.git</pre>
          </li>
          <li>Navigate to the project directory.
            <pre className="bg-gray-800 text-white p-2 rounded">cd BloxAI.git</pre>
          </li>
          <li>Add a reference(remote) to the original repository.
            <pre className="bg-gray-800 text-white p-2 rounded">git remote add upstream https://github.com/subhadeeproy3902/BloxAI.git</pre>
          </li>
          <li>Check the remotes for this repository.
            <pre className="bg-gray-800 text-white p-2 rounded">git remote -v</pre>
          </li>
          <li>Always take a pull from the upstream repository to your master branch to keep it at par with the main project (updated repository).
            <pre className="bg-gray-800 text-white p-2 rounded">git pull upstream main</pre>
          </li>
          <li>Create a new branch.
            <pre className="bg-gray-800 text-white p-2 rounded">git checkout -b &lt;your_branch_name&gt;</pre>
          </li>
          <li>Perform your desired changes to the code base.</li>
          <li>Track your changes.
            <pre className="bg-gray-800 text-white p-2 rounded">git add .</pre>
          </li>
          <li>Commit your changes.
            <pre className="bg-gray-800 text-white p-2 rounded">git commit -m "Relevant message"</pre>
          </li>
          <li>Push the committed changes in your feature branch to your remote repo.
            <pre className="bg-gray-800 text-white p-2 rounded">git push -u origin &lt;your_branch_name&gt;</pre>
          </li>
          <li>To create a pull request, click on <em>compare and pull requests</em>.</li>
          <li>Add appropriate title and description to your pull request explaining your changes and efforts done.</li>
          <li>Click on <em>Create Pull Request</em>.</li>
        </ol>

        <h2 className="text-2xl font-bold mb-4 text-foreground/75">
          Alternatively, Contribute using GitHub Desktop
        </h2>
        <ol className="mb-4 list-decimal list-inside text-muted-foreground">
          <li>Open GitHub Desktop: Launch GitHub Desktop and log in to your GitHub account if you haven't already.</li>
          <li>Clone the Repository:
            <ul className="list-disc list-inside">
              <li>If you haven't cloned the ResourceHub repository yet, you can do so by clicking on the "File" menu and selecting "Clone Repository."</li>
              <li>Choose the ResourceHub repository from the list of repositories on GitHub and clone it to your local machine.</li>
            </ul>
          </li>
          <li>Switch to the Correct Branch:
            <ul className="list-disc list-inside">
              <li>Ensure you are on the branch that you want to submit a pull request for.</li>
              <li>If you need to switch branches, you can do so by clicking on the "Current Branch" dropdown menu and selecting the desired branch.</li>
            </ul>
          </li>
          <li>Make Changes: Make your changes to the code or files in the repository using your preferred code editor.</li>
          <li>Commit Changes:
            <ul className="list-disc list-inside">
              <li>In GitHub Desktop, you'll see a list of the files you've changed. Check the box next to each file you want to include in the commit.</li>
              <li>Enter a summary and description for your changes in the "Summary" and "Description" fields, respectively. Click the "Commit to &lt;branch-name&gt;" button to commit your changes to the local branch.</li>
            </ul>
          </li>
          <li>Push Changes to GitHub: After committing your changes, click the "Push origin" button in the top right corner of GitHub Desktop to push your changes to your forked repository on GitHub.</li>
          <li>Create a Pull Request:
            <ul className="list-disc list-inside">
              <li>Go to the GitHub website and navigate to your fork of the ResourceHub repository.</li>
              <li>You should see a button to "Compare & pull request" between your fork and the original repository. Click on it.</li>
            </ul>
          </li>
          <li>Review and Submit:
            <ul className="list-disc list-inside">
              <li>On the pull request page, review your changes and add any additional information, such as a title and description, that you want to include with your pull request.</li>
              <li>Once you're satisfied, click the "Create pull request" button to submit your pull request.</li>
            </ul>
          </li>
          <li>Wait for Review: Your pull request will now be available for review by the project maintainers. They may provide feedback or ask for changes before merging your pull request into the main branch of the ResourceHub repository.</li>
        </ol>
        
        <h2 className="text-2xl font-bold mb-4 text-foreground/75">
          Support the Project
        </h2>
        <p className="mb-4 text-muted-foreground">
          If you find this project helpful, please consider giving it a star on GitHub! Your support helps to grow the project and reach more contributors.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-foreground/75">
          Issue Report Process
        </h2>
        <ol className="mb-4 list-decimal list-inside text-muted-foreground">
          <li>Go to the project's issues.</li>
          <li>Give proper description for the issues.</li>
          <li>Don't spam to get the assignment of the issue.</li>
          <li>Wait for till someone is looking into it!</li>
          <li>Start working on issue only after you got assigned that issue.</li>
        </ol>
        <p className="mb-4 text-muted-foreground">
          Interested contributors and issue raisers are also requested to join <a href="https://chat.whatsapp.com/E5oRd1VG1Ov4HoNPq4QcRU" className="hover:underline">WhatsApp Group</a> for more discussions and faster PR merging.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-foreground/75">
          Contributor Details
        </h2>
        <p className="mb-4 text-muted-foreground">
          To ensure transparency and recognition for your contributions, we've established a straightforward process. When resolving issues or submitting PRs, please remember to fill out your details in <code>src/app/contributors/ContributorsData.ts</code>. This file serves as a repository of the individuals who are actively involved in improving our platform.
        </p>
        <p className="mb-4 text-muted-foreground">
          Add your Name, Image URL and Github link in this file as an object:
          <a href="https://postimg.cc/fk0rPV3H" className="hover:underline">
            <img src="https://i.postimg.cc/pV0Mp8Pt/Screenshot-2024-05-13-200754.png" alt="File Location" className="mt-2"/>
          </a>
        </p>
        <p className="mb-4 text-muted-foreground">
          However, it's important to adhere to strict regulations to maintain the integrity of our contributor records:
        </p>
        <ul className="mb-4 list-disc list-inside text-muted-foreground">
          <li>Only Add Your Details: You are allowed to add your own details to the ContributorsData.ts file. This helps us accurately attribute contributions to the right individuals.</li>
          <li>Respect Others' Details: Modifying or tampering with existing contributor details is strictly prohibited. Any unauthorized changes may result in your PR not being merged or accepted.</li>
        </ul>
        <p className="mb-4 text-muted-foreground">
          We understand that open source collaboration is filled with excitement and fulfillment. Your contributions are invaluable, and we're committed to ensuring that your efforts are duly recognized and appreciated.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-foreground/75">
          Pull Request Process
        </h2>
        <ol className="mb-4 list-decimal list-inside text-muted-foreground">
          <li>Ensure that you have self-reviewed your code.</li>
          <li>Make sure you have added the proper description for the functionality of the code.</li>
          <li>I have commented my code, particularly in hard-to-understand areas.</li>
          <li>Add screenshot it help in review.</li>
          <li>Submit your PR by giving the necessary information in PR template and hang tight we will review it really soon.</li>
        </ol>

        <p className="mb-4 text-muted-foreground">
          Thank you for contributing.
        </p>
      </div>
    </div>
  );
};

export default Contributing;
