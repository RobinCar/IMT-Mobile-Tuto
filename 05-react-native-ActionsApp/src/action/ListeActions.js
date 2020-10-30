import React from 'react'
import { View, Text } from 'react-native'
import UneAction from './UneAction'


const ListeActions = ({ actions, updateTerminated, deleteAction, filtre }) => {

    return (
        <View>
            {actions.map((action, index) => {
                if (filtre == 'All') {
                    return (
                        <UneAction updateTerminated={() => updateTerminated(index)} deleteAction={() => deleteAction(index)} action={action} />
                    );
                } else if (filtre == 'Terminated' && action.isTerminated) {
                    return (
                        <UneAction updateTerminated={() => updateTerminated(index)} deleteAction={() => deleteAction(index)} action={action} />
                    );
                } else if (filtre == 'NotTerminated' && !action.isTerminated) {
                    return (
                        <UneAction updateTerminated={() => updateTerminated(index)} deleteAction={() => deleteAction(index)} action={action} />
                    );
                }
            })}
        </View>
    )
}

export default ListeActions