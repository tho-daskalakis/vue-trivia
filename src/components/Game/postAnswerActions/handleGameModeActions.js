import rushModeActions from './rushModeActions';
import standardModeActions from './standardModeActions';

export default function handleGameModeActions(mode) {
  const modeActions = {
    standardModeActions: standardModeActions.bind(this),
    rushModeActions: rushModeActions.bind(this),
  };

  const methodName = mode + 'ModeActions';
  modeActions[methodName]();
}
