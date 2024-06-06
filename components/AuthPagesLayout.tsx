import { StyleSheet, Text, View, ViewProps } from 'react-native'
import React, { ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ContainerProps extends ViewProps{
    children?: ReactNode
}
const AuthPagesLayout: React.FC<ContainerProps> = ({children}) => {
    const inset = useSafeAreaInsets()
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: inset.top || 10,
        paddingBottom: inset.bottom || 10
      }}
    >
     {children}
    </View>
  )
}

export default AuthPagesLayout

const styles = StyleSheet.create({})