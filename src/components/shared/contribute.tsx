import React from "react";

const ContributingGuidelines = () => {
  return (
    <div className="min-h-[40rem] w-full pt-7 rounded-md flex justify-center flex-col antialiased relative overflow-hidden">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 mt-0 text-foreground/75">
          Contributing Guidelines
        </h1>
        <p className="mb-4 text-muted-foreground">
          This documentation contains a set of guidelines to help you during the contribution process. We are happy to welcome all the contributions from anyone willing to improve/add new scripts to this project. Thank you for helping out and remember, <strong>no contribution is too small.</strong>
        </p>
        <p className="mb-4 text-muted-foreground">
          Please note we have a <a href="CODE_OF_CONDUCT.md" className="text-black-500 underline">code of conduct</a> please follow it in all your interactions with the project.
        </p>

        <h2 className="text-2xl font-semibold mb-2 text-foreground/75">
          Need some help regarding the basics?
        </h2>
        <p className="mb-4 text-muted-foreground">
          You can refer to the following articles on basics of Git and Github and also contact the Project Mentors, in case you are stuck:
        </p>
        <ul className="list-disc list-inside mb-4 text-muted-foreground">
          <li><a href="https://help.github.com/en/github/getting-started-with-github/fork-a-repo" className="text-black-500 underline">Forking a Repo</a></li>
          <li><a href="https://help.github.com/en/desktop/contributing-to-projects/creating-an-issue-or-pull-request" className="text-black-500 underline">Cloning a Repo</a></li>
          <li><a href="https://opensource.com/article/19/7/create-pull-request-github" className="text-black-500 underline">How to create a Pull Request</a></li>
          <li><a href="https://towardsdatascience.com/getting-started-with-git-and-github-6fcd0f2d4ac6" className="text-black-500 underline">Getting started with Git and GitHub</a></li>
          <li><a href="https://docs.github.com/en/get-started/start-your-journey/git-and-github-learning-resources" className="text-black-500 underline">Learn GitHub from Scratch</a></li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2 text-foreground/75">
          Steps to Contribute
        </h2>
        <ol className="list-decimal list-inside mb-4 text-muted-foreground">
          <li>Fork <a href="https://github.com/subhadeeproy3902/BloxAI.git" className="text-black-500 underline">this repository</a>.</li>
          <li>Clone your forked copy of the project.</li>
          <pre className="bg-gray-100 p-2 rounded mb-2">
            <code>git clone https://github.com/&lt;your_user_name&gt;/BloxAI.git</code>
          </pre>
          <li>Navigate to the project directory.</li>
          <pre className="bg-gray-100 p-2 rounded mb-2">
            <code>cd BloxAI.git</code>
          </pre>
          <li>Add a reference(remote) to the original repository.</li>
          <pre className="bg-gray-100 p-2 rounded mb-2">
            <code>git remote add upstream https://github.com/subhadeeproy3902/BloxAI.git</code>
          </pre>
          <li>Check the remotes for this repository.</li>
          <pre className="bg-gray-100 p-2 rounded mb-2">
            <code>git remote -v</code>
          </pre>
          <li>Always take a pull from the upstream repository to your master branch to keep it at par with the main project (updated repository).</li>
          <pre className="bg-gray-100 p-2 rounded mb-2">
            <code>git pull upstream main</code>
          </pre>
          <li>Create a new branch.</li>
          <pre className="bg-gray-100 p-2 rounded mb-2">
            <code>git checkout -b &lt;your_branch_name&gt;</code>
          </pre>
          <li>Perform your desired changes to the code base.</li>
          <li>Track your changes.</li>
          <pre className="bg-gray-100 p-2 rounded mb-2">
            <code>git add .</code>
          </pre>
          <li>Commit your changes.</li>
          <pre className="bg-gray-100 p-2 rounded mb-2">
            <code>git commit -m "Relevant message"</code>
          </pre>
          <li>Push the committed changes in your feature branch to your remote repo.</li>
          <pre className="bg-gray-100 p-2 rounded mb-2">
            <code>git push -u origin &lt;your_branch_name&gt;</code>
          </pre>
          <li>To create a pull request, click on `compare and pull requests`.</li>
          <li>Add appropriate title and description to your pull request explaining your changes and efforts done.</li>
          <li>Click on `Create Pull Request`.</li>
        </ol>

        <h2 className="text-2xl font-semibold mb-2 text-foreground/75">
          Alternatively contribute using GitHub Desktop
        </h2>
        <ol className="list-decimal list-inside mb-4 text-muted-foreground">
          <li>Open GitHub Desktop and log in to your GitHub account if you haven't already.</li>
          <li>Clone the Repository.</li>
          <li>Switch to the Correct Branch.</li>
          <li>Make Changes using your preferred code editor.</li>
          <li>Commit Changes in GitHub Desktop.</li>
          <li>Push Changes to GitHub.</li>
          <li>Create a Pull Request on GitHub.</li>
          <li>Review and Submit the Pull Request.</li>
          <li>Wait for Review by the project maintainers.</li>
        </ol>

        <h2 className="text-2xl font-semibold mb-2 text-foreground/75">
          Issue Report Process
        </h2>
        <ol className="list-decimal list-inside mb-4 text-muted-foreground">
          <li>Go to the project's issues.</li>
          <li>Provide a proper description for the issues.</li>
          <li>Don't spam to get the assignment of the issue.</li>
          <li>Wait until someone looks into it.</li>
          <li>Start working on the issue only after you are assigned.</li>
        </ol>

        <p className="mb-4 text-muted-foreground">
          Interested contributors and issue raisers are also requested to join our <a href="https://chat.whatsapp.com/E5oRd1VG1Ov4HoNPq4QcRU" className="text-black-500 underline">WhatsApp Group</a> for more discussions and faster PR merging.
        </p>

        <h2 className="text-2xl font-semibold mb-2 text-foreground/75">
          Pull Request Process
        </h2>
        <ol className="list-decimal list-inside mb-4 text-muted-foreground">
          <li>Ensure that you have self-reviewed your code.</li>
          <li>Make sure you have added a proper description for the functionality of the code.</li>
          <li>Comment your code, particularly in hard-to-understand areas.</li>
          <li>Add screenshots if it helps in the review.</li>
          <li>Submit your PR by providing the necessary information in the PR template and hang tight; we will review it really soon.</li>
        </ol>

        <h2 className="text-2xl font-semibold mb-2 text-foreground/75">
          Thank you for contributing !
        </h2>
      </div>
    </div>
  );
};

export default ContributingGuidelines;
