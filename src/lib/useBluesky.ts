import { agent } from './api'

export default () => {
  const getSession = () => {
    return agent.session
  }

  return {
    agent,
    getSession,
  }
} 