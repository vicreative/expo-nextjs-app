import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Cell } from './cell';
import { View } from 'native-base';

const sum = arr => arr.reduce((acc, n) => acc + n, 0);

export class Col extends Component {
  static propTypes = {
    width: PropTypes.number,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  };

  render() {
    const { data, style, width, heightArr, flex, textStyle, ...props } = this.props;

    return data ? (
      <View style={[width ? { width: width } : { flex: 1 }, flex && { flex: flex }, style]}>
        {data.map((item, i) => {
          const height = heightArr && heightArr[i];
          return (
            <Cell
              key={i}
              data={item}
              width={width}
              height={height}
              textStyle={textStyle}
              {...props}
            />
          );
        })}
      </View>
    ) : null;
  }
}

export class Cols extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  };

  render() {
    const { data, style, widthArr, heightArr, flexArr, textStyle, ...props } = this.props;

    let width = widthArr ? sum(widthArr) : 0;

    return data ? (
      <View style={[styles.cols, width && { width }]}>
        {data.map((item, i) => {
          const flex = flexArr && flexArr[i];
          const wth = widthArr && widthArr[i];
          return (
            <Col
              key={i}
              data={item}
              width={wth}
              heightArr={heightArr}
              flex={flex}
              style={style}
              textStyle={textStyle}
              {...props}
            />
          );
        })}
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  cols: { flexDirection: 'row' }
});
