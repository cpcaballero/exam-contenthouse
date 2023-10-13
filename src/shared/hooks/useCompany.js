import { useSelector } from 'react-redux'

import useLatestEntity from '@hooks/useLatestEntity'
import useThunkDispatch from '@hooks/useThunkDispatch'

import * as companyActions from '@redux/modules/company'

function createCompany(companyParams, dispatch){
  const { createCompany: createFn } = companyActions

  const id = Math.random().toString(36).substring(2, 9)
  const newCompany = {
    ...companyParams,
    id,
  }

  return dispatch(createFn(newCompany))
}

function updateCompany(companyParams, dispatch){
  const { updateCompany: updateFn } = companyActions

  return dispatch(updateFn(companyParams))
}

function deleteCompany(user, dispatch){
  const { deleteCompany: deleteFn } = companyActions

  return dispatch(deleteFn(user))
}

const useCompany = (initUser = {}) => {
    const { entity: user } = useLatestEntity(initUser, 'users')

    const dispatch = useThunkDispatch()

    const { creating, deleting, loading, updating } = useSelector(reduxState => reduxState.users)

    return {
      user,
      callbacks: {
        updateCompany: companyParams => updateCompany(companyParams, dispatch),
        createCompany: companyParams => createCompany(companyParams, dispatch),
        deleteCompany: companyParams => deleteCompany(companyParams, dispatch),
      },
      creating,
      deleting,
      loading,
      updating,
    }
}

export default useCompany
