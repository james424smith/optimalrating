import React from 'react'
import { Divider } from 'antd'
import { SpecialSurvey, CategorySurvey } from 'components'

export default () => {
  var url = `/home-survey-approval?country=${localStorage.getItem('country')}`
  return (
    <div className='Home'>
      <SpecialSurvey />
      <Divider style={{ borderColor: 'rgba(0,0,0,0.1)' }} />
      <CategorySurvey url={url} />
    </div>
  )
}
