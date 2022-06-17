import { View, ScrollView, useDripsyTheme, Pressable, Row, Text } from 'dripsy'
import { Platform, StyleSheet } from 'react-native'
import { createParam } from 'solito'
import { AnimatePresence } from 'moti'
import { Repro } from './repro'
import { useRouter } from 'solito/router'
import { useState } from 'react'

const { useParam } = createParam<{ id: string }>()

export function UserDetailScreen() {
  const [id, setId] = useParam('id')
  const { theme } = useDripsyTheme()
  const router = useRouter()
  const [navDirection, setNavDirection] = useState<'left' | 'right'>('right')

  const navigateTo = (_step) =>
    Platform.OS === 'web' ? router.push(`/user/${_step}`) : setId(_step)

  const goBack = () => {
    setNavDirection('left')
    if (parseInt(id) === 1) router.push('/')
    else navigateTo(parseInt(id) - 1)
  }

  const goNext = () => {
    setNavDirection('right')
    navigateTo(parseInt(id) + 1)
  }

  return (
    <View
      sx={{
        flex: 1,
        bg: '#FFF2EE',
      }}
      style={StyleSheet.absoluteFill}
    >
      <View sx={{ flex: 1 }}>
        <ScrollView
          sx={{
            px: '$4',
            pt: ['$7', '$9'],
            // Offset bottom padding with top padding of footer
            pb: [
              theme.space.$7 - theme.space.$4,
              theme.space.$9 - theme.space.$4,
            ],
          }}
        >
          <AnimatePresence exitBeforeEnter>
            {parseInt(id) === 1 && (
              <Repro key="repro1" navDirection={navDirection} />
            )}
            {parseInt(id) === 2 && (
              <Repro key="repro2" navDirection={navDirection} />
            )}
            {parseInt(id) === 3 && (
              <Repro key="repro3" navDirection={navDirection} />
            )}
          </AnimatePresence>
        </ScrollView>
        <Row sx={{ mb: 100, justifyContent: 'center' }}>
          <Pressable onPress={goBack} sx={{ mr: 16 }}>
            <Text sx={{ fontSize: 20 }}>prev</Text>
          </Pressable>
          <Pressable onPress={goNext}>
            <Text sx={{ fontSize: 20 }}>next</Text>
          </Pressable>
        </Row>
      </View>
    </View>
  )
}
