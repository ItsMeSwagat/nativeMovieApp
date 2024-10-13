import { View, Text, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

var { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View
      style={{ width, height }}
      className=" flex-row justify-center items-center bg-neutral-900"
    >
      <Progress.CircleSnail thickness={15} size={180} color="#eddb8e" />
    </View>
  );
}
