import { StyleSheet, Text, View, Image,FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

const Comment = (props) => {
  return (
    <View style = {{
      flexDirection: 'row',
      marginLeft: 10,
      marginVertical: 10,
    }}>
        <Image
        source={props.Avarta}
        style = {{
          width: 25,
          height: 25,
          borderRadius: 50,
        }}
        />
  

      <View style = {{
        marginLeft: 10,
      }}>
        <Text style = {{
          color: 'grey'
        }}>
          {props.NameChannel}
        </Text>
        <Text style = {{
          fontSize: 20,
          width: Dimensions.get('screen').width - 50
        }}
        numberOfLines={4}
        ellipsizeMode='tail'
        >
          {props.Comment}
        </Text>

      </View>


      
    </View>
  )
}

export default Comment

const styles = StyleSheet.create({})