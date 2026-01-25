# Nodebook

We're building something resembling "Awesome Repositories" for Github. But, instead of keeping completely static markdown lists of all the items, we will curate a graph-based collection of items that others can contribute to either directly in code via Github or by having a visual editor for the graph, that automatically opens respective PRs as contributions.

The main components are as following:
- JSON-based data that persist the information about graphs content, including all the notes and their content and the links between them
  - this data is the main content for the collection
- visual representation of the data rendered as a graph that is generated as Github Pages based on the content within the repository
- the page with the visual representation also enables people to sign up with their Github account, make changes on the graph, visually and directly, including adding new nodes, changing the content of the existing ones, moving them around, linking to some other nodes, etc., and all of these changes are recorded as a series of atomic operational transforms over the graph, and then a PR is opened with those changes to be applied to the repository data
  - while the changes that are being made are recorded as operational transforms, ultimately, only the fully derived state will be getting merged into the repo, and so operational transformers are only a temporary artifact within a PR, but won't be persisted in the repo after the merge

So, we are building a Github app or a bot, that somebody will be able to install in their GitHub repo that will, based on the content within that repo, generate GitHub pages that visualize the content as a graph, and enable for that entire contributing workflow to other people over their repo's content.