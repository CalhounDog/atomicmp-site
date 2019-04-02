import * as React from 'react';
import Container from "src/components/Container";

// tslint:disable-next-line: no-empty-interface
interface IRecoveryProps {
  
}

interface IRecoveryState {
  error: string;
  formData: {
    password: string;
    confirmPassword: string;
  };
  requestId: string;
  submitting: boolean;
}

class Recovery extends React.Component<IRecoveryProps, Partial<IRecoveryState>> {

  constructor(props: any) {
    super(props);
    
  }


  public render() {
    return (
      <Container>
        <h1>Password Recovery</h1>
      </Container>
    )
  }
}

export default Recovery;
