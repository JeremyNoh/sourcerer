import React, { Component } from "react";

import "./App.css";
import { Heading, Pane } from "evergreen-ui";
import { Doughnut, Polar } from "react-chartjs-2";

class InfoUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataGraphOne: {},
      dataGraphTwo: {}
    };
  }
  componentDidMount() {
    this.formatData(this.props.data);
  }

  giveMeOneGraph = data => {
    let labels = [];
    let colors = [];
    data.forEach(language => {
      for (let oneLanguage of language.languages.nodes) {
        labels.push(oneLanguage.name);
        colors.push(oneLanguage.color);
      }
    });

    let obj = {};
    let objColor = {};
    const ref = [...new Set(labels)];
    const refColor = [...new Set(colors)];

    for (let key of ref) {
      obj[key] = labels.filter(x => x === key).length;
    }
    for (let keyColor of refColor) {
      objColor[keyColor] = colors.filter(x => x === keyColor).length;
    }
    let dataGraphOne = [];
    let labelsGraphOne = [];
    let colorsGraphOne = [];

    for (var dispacth in obj) {
      labelsGraphOne.push(dispacth);
      dataGraphOne.push(obj[dispacth]);
    }

    for (var dispacthColor in objColor) {
      colorsGraphOne.push(dispacthColor);
    }
    console.log(colorsGraphOne);

    let dataGraph = {
      datasets: [
        {
          data: dataGraphOne,
          backgroundColor: colorsGraphOne,
          label: "Number of projects by language"
        }
      ],
      labels: labelsGraphOne
    };

    return dataGraph;
  };

  giveMeTwoGraph = data => {
    let dataCommit = [];
    data.forEach(language => {
      let obj = {};
      obj.name = language.name;
      obj.nbCommit = language.defaultBranchRef.target.history.totalCount;
      dataCommit.push(obj);
    });

    let newArray = dataCommit.sort(function(a, b) {
      return b.nbCommit - a.nbCommit;
    });

    newArray = newArray.slice(0, 5);

    let dataGraphTwo = [];
    let labelsGraphTwo = [];

    for (var dispacth of newArray) {
      labelsGraphTwo.push(dispacth["name"]);
      dataGraphTwo.push(dispacth["nbCommit"]);
    }

    let dataGraph = {
      datasets: [
        {
          data: dataGraphTwo,
          backgroundColor: [
            "#e34c26",
            "#438eff",
            "#C1F12E",
            "#563d7c",
            "#2b7489",
            "#ffac45"
          ],
          label: "Top 5 most commit projects"
        }
      ],
      labels: labelsGraphTwo
    };

    return dataGraph;
  };

  formatData = data => {
    let dataGraphOne = this.giveMeOneGraph(data);
    let dataGraphTwo = this.giveMeTwoGraph(data);
    this.setState({ dataGraphOne, dataGraphTwo });
  };

  render() {
    if (this.props.data.length < 0) {
      return null;
    }
    return (
      <>
        <Pane
          padding={24}
          width="100%"
          alignItems="center"
          justifyContent="center"
          size={15}
          backgroundColor="lightsteelblue"
        >
          <Heading
            size={800}
            color="white"
            marginBottom={"3"}
            style={{ textAlign: "center", color: "black" }}
          >
            Graph
          </Heading>
          <Pane
            float="left"
            padding={24}
            marginRight={"1%"}
            width="49%"
            alignItems="center"
            justifyContent="center"
            size={15}
            backgroundColor="#282c34"
          >
            <Heading size={400} style={{ textAlign: "center", color: "white" }}>
              Number of projects by language
            </Heading>
            <Doughnut data={this.state.dataGraphOne} />
          </Pane>
          <Pane
            float="left"
            marginLeft={"1%"}
            padding={24}
            width="49%"
            alignItems="center"
            justifyContent="center"
            size={15}
            backgroundColor="#282c34"
          >
            <Heading size={400} style={{ textAlign: "center", color: "white" }}>
              Projets avec le + de commit
            </Heading>
            <Polar data={this.state.dataGraphTwo} />
          </Pane>
        </Pane>
      </>
    );
  }
}

export default InfoUser;
