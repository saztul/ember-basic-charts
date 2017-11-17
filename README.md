[![TravisCI Build Status](https://travis-ci.org/saztul/ember-basic-charts.svg?branch=master)](https://travis-ci.org/saztul/ember-basic-charts)
[![Code Climate](https://codeclimate.com/github/saztul/ember-basic-charts/badges/gpa.svg)](https://codeclimate.com/github/saztul/ember-basic-charts)
[![npm version](https://badge.fury.io/js/ember-basic-charts.svg)](https://badge.fury.io/js/ember-basic-charts)

# ember-basic-charts

A collection of charts written for and in Ember.
No dependecies apart from the default Ember packages.

## Included charts

* [Pie chart](#pie-chart)
* [Bar chart](#bar-chart)
* [Value range chart](#value-range-chart)

### <a name=pie-chart></a>Pie Chart

#### Data

```javascript
slices = [
  { "label":"One",    "value":1 },
  { "label":"Two",    "value":2 },
  { "label":"Three",  "value":3 },
  { "label":"Four",   "value":4 },
  { "label":"Five",   "value":5, "color": '#006' }
]
```

#### Minimal

```hbs
{{pie-chart
  slices=slices
}}
```

![pie chart minimal](https://github.com/saztul/ember-basic-charts/raw/master/readme-assets/pie-simple.png "Minimal")

#### All options

```hbs
{{pie-chart
  slices=slices
  slicesMax=4
  radius=70
  tilt=315
  borderColor="rgba(255,255,255,0.5)"
  bumpBy=5
  otherLabel="Other"
  otherColor="#dddddd"
  emptyColor="#eeeeee"
  noDataMessage="No data"
  seedColor="#d13f19"
}}
```

![pie chart all options](https://github.com/saztul/ember-basic-charts/raw/master/readme-assets/pie-all-opts.png "All options")

### <a name=bar-chart></a>Bar Chart

#### Data

```javascript
data: [
  { position: 10, label: "Ten",       value: 5 },
  { position: 13, label: "Thirteen",  value: 3 },
  { position: 20, label: "Twenty",    value: 7 },
]
```

#### Usage

```hbs
{{bar-chart
  data=data
}}
```

![bar chart](https://github.com/saztul/ember-basic-charts/raw/master/readme-assets/bar-chart.png "Bar chart")

### <a name=value-range-chart></a>Value range chart

#### Range

```hbs
{{value-range-chart
  start=20
  stop=70
}}
```

![range](https://github.com/saztul/ember-basic-charts/raw/master/readme-assets/range.png "Range")

#### Single line

```hbs
{{value-range-chart mid=30}}
```

![line](https://github.com/saztul/ember-basic-charts/raw/master/readme-assets/line.png "Line")

#### Line and range with altered minimum and maximum

```hbs
{{value-range-chart
  min=20
  max=140
  start=30
  stop=120
  mid=50
}}
```

![range and line](https://github.com/saztul/ember-basic-charts/raw/master/readme-assets/range-and-line.png "Range and Line")


## Installation

* `git clone <repository-url>` this repository
* `cd ember-basic-charts`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
