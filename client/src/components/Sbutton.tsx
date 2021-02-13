import { Button } from '@chakra-ui/react';
import React from 'react'

interface SbuttonProps {
    name:string
}

const Sbutton: React.FC<SbuttonProps> = ({name}) => {
        return (
            <Button mt='10px' colorScheme='telegram'>{name}</Button>
        );
}

export default Sbutton;