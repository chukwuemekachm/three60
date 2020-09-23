import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  color: #4673E4;
  font-size: 24px;
  font-weight: bold;
`;

const StyledView = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <SafeAreaView>
      <StyledView>
        <StyledText>Three60</StyledText>
      </StyledView>
    </SafeAreaView>
  );
}

export default App;
