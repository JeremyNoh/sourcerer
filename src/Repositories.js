import React, { Component } from "react";

import "./App.css";
import {
  Badge,
  Paragraph,
  Table,
  Pill,
  toaster,
  Dialog,
  Heading
} from "evergreen-ui";

import { Query } from "react-apollo";

import myclient from "./client";
import Graph from "./Graph";

class Repositories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
      isShown: false,
      infoRepo: undefined,
      counterCommit: 0
    };
  }

  componentDidMount() {}
  countCommit = repos => {
    // console.log(repos);
    let { counterCommit } = this.state;
    for (let repo of repos) {
      counterCommit += repo.defaultBranchRef.target.history.totalCount;
    }
    this.setState({ counterCommit });
  };

  infoOfRepo = infoRepo => {
    this.setState({ isShown: true, infoRepo });
  };

  content = data => {
    const { repositories, isShown } = this.state;
    return (
      <>
        {this.state.infoRepo && (
          <Dialog
            isShown={isShown}
            title={this.state.infoRepo.name}
            onCloseComplete={() => this.setState({ isShown: false })}
            hasFooter={false}
            style={{ textAlign: "center" }}
          >
            collaborators :
            {this.state.infoRepo.collaborators.nodes.map((collabo, index) => (
              <Badge color="neutral" isSolid marginRight={8} key={index}>
                {collabo.login}
              </Badge>
            ))}
            <Paragraph>
              Nombre de commit :{" "}
              {this.state.infoRepo.defaultBranchRef.target.history.totalCount}
            </Paragraph>
            Language :
            {this.state.infoRepo.languages.nodes.map((languages, index) => (
              <Badge color="neutral" isSolid marginRight={8} key={index}>
                {languages.name}
              </Badge>
            ))}
            <Paragraph>
              <a href={this.state.infoRepo.projectsUrl} target="blank">
                En savoir plus
              </a>
            </Paragraph>
          </Dialog>
        )}
        <Table width="70%">
          <Table.Head>
            <Table.TextHeaderCell>Name Repo </Table.TextHeaderCell>
            <Table.TextHeaderCell>Language</Table.TextHeaderCell>
            <Table.TextHeaderCell>Commit</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height={240}>
            {repositories.map((repositorie, id) => (
              <Table.Row
                isSelectable
                onSelect={() => {
                  this.infoOfRepo(repositorie);
                }}
                key={id}
              >
                <Table.TextCell>{repositorie.name}</Table.TextCell>
                <Table.TextCell>
                  {repositorie.languages.nodes.map((language, index) => (
                    <Badge color="neutral" isSolid marginRight={8} key={index}>
                      {language.name}
                    </Badge>
                  ))}
                </Table.TextCell>
                <Table.TextCell isNumber>
                  <Pill display="inline-flex" color="teal" isSolid>
                    {repositorie.defaultBranchRef.target.history.totalCount}
                  </Pill>
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  };

  render() {
    const { repositories } = this.state;

    return (
      <Query query={myclient.getRepo}>
        {({ loading, error, data }) => {
          if (loading) {
            return <span>WAIT</span>;
          }

          if (repositories.length <= 0) {
            for (let repo of data.viewer.repositories.nodes) {
              repositories.push(repo);
            }
            this.countCommit(repositories);
            toaster.success("Click on a Repo pour see the description", {
              duration: 5
            });
          }

          return (
            <>
              <Heading size={800} marginBottom={5}>
                REPOSITORY ({this.props.repositoryCount})
              </Heading>
              <Heading size={700}>
                Full Commit : {this.state.counterCommit}
              </Heading>
              {this.content()}
              {<Graph data={repositories} />}
            </>
          );
        }}
      </Query>
    );
  }
}

export default Repositories;
