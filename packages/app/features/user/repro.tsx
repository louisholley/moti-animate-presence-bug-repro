import React, { useState } from 'react'
import { styled, Text } from 'dripsy'
import { MotiPressable } from 'moti/interactions'
import { MotiView } from 'moti'

const DripsyMotiView = styled(MotiView)()

const ToggleButton = ({ children }) => {
  const [checked, setChecked] = useState(true)

  return (
    <MotiPressable
      style={{ marginBottom: 4 }}
      onPress={() => setChecked(!checked)}
    >
      <DripsyMotiView
        sx={{ p: 4, bg: 'lightblue' }}
        animate={{ opacity: checked ? 1 : 0.5 }}
      >
        {children}
      </DripsyMotiView>
    </MotiPressable>
  )
}

export const Repro = ({ navDirection }) => {
  return (
    <DripsyMotiView
      sx={{
        alignItems: 'center',
      }}
      from={{
        opacity: 0,
        translateX: navDirection === 'right' ? 100 : -100,
      }}
      animate={{
        opacity: 1,
        translateX: 0,
      }}
      exit={{
        opacity: 0,
        translateX: navDirection == 'right' ? -100 : 100,
      }}
      transition={{
        type: 'timing',
        duration: 500,
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <ToggleButton key={i}>
          <Text>button {i}</Text>
        </ToggleButton>
      ))}
    </DripsyMotiView>
  )
}
