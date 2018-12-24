import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: operation => {
    const { REACT_APP_GITHUB_TOKEN } = process.env;
    operation.setContext(context => ({
      headers: {
        ...context.headers,
        Authorization: `Bearer ${REACT_APP_GITHUB_TOKEN}`
      }
    }));
  }
});

const getInfo = gql`
  query {
    viewer {
      login
      email
      avatarUrl
      bio
      url
      followers {
        totalCount
      }
      following {
        totalCount
      }
    }
    search(query: "user:jeremynoh ", type: REPOSITORY) {
      repositoryCount
    }
  }
`;

const getRepo = gql`
  query {
    viewer {
      repositories(first: 100) {
        nodes {
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  totalCount
                }
              }
            }
          }
          name
          id
          projectsUrl
          languages(first: 5) {
            totalCount
            nodes {
              color
              name
            }
          }
          collaborators(first: 30) {
            totalCount
            nodes {
              login
            }
          }
        }
      }
    }
  }
`;

export default {
  client,
  getInfo,
  getRepo
};
