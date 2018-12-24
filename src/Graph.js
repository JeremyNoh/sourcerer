import React, { Component } from "react";

import "./App.css";
import { Heading, Pane } from "evergreen-ui";
import { Polar, Doughnut, Pie } from "react-chartjs-2";

class InfoUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataGraphOne: {}
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

    let dataGraph = {
      datasets: [
        {
          data: dataGraphOne,
          backgroundColor: colorsGraphOne,
          label: "My dataset"
        }
      ],
      labels: labelsGraphOne
    };

    return dataGraph;
  };

  formatData = data => {
    let dataGraphOne = this.giveMeOneGraph(data);

    this.setState({ dataGraphOne });
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
              Différents langages pour tout les projets
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
              Différents langages pour tout les projets
            </Heading>
            <Pie data={this.state.dataGraphOne} />
          </Pane>
        </Pane>
      </>
    );
  }
}

export default InfoUser;
