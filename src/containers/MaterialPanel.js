import React, { useState, useEffect } from 'react'
import {
  MATERIAL_TYPE_CODE,
  MATERIAL_SUBTYPE,
  MATERIAL_SUBTYPE_TITLE,
} from '@/constants'
import { getMaterialList } from '../apis'
import { Spin, Tooltip } from 'antd'
import styles from './MaterialPanel.module.less'

const MaterialPanel = ({ textEditing, materialType, onSelect }) => {
  const [materials, setMaterials] = useState({})
  const [materialClassName, setMaterialClassName] = useState()
  const [loading, toggleLoading] = useState(false)

  useEffect(() => {
    if (textEditing || !materialType) return

    toggleLoading(true)

    Promise.all(
      MATERIAL_SUBTYPE[materialType].map(tag =>
        getMaterialList({
          tag,
          type: MATERIAL_TYPE_CODE[materialType],
        })
      )
    ).then(list => {
      const materials = {}

      MATERIAL_SUBTYPE[materialType].forEach((subType, index) => {
        materials[MATERIAL_SUBTYPE_TITLE[subType]] = list[index]
      })

      setMaterials(materials)
      setMaterialClassName(styles[materialType])
      toggleLoading(false)
    })
  }, [materialType, textEditing])

  if (!materialType || textEditing) {
    return <div className={styles.container} />
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>元素替换</header>
      <Spin spinning={loading} size='large'>
        <div className={styles.list}>
          {Object.keys(materials).map(type => (
            <div key={type} className={styles.section}>
              <p className={styles.title}>{type}</p>
              <div className={styles.content}>
                {materials[type].map(({ id, img, click, pv, clickRate }) => (
                  <div className={styles.item} key={id}>
                    <Tooltip title={`曝光次数：${pv} 点击次数：${click}`}>
                      <div
                        className={styles.material}
                        onClick={() => onSelect(img)}
                      >
                        <img
                          src={img}
                          alt='素材'
                          className={materialClassName}
                        />
                      </div>
                    </Tooltip>
                    <p>点击率: {clickRate}%</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Spin>
    </div>
  )
}

export default MaterialPanel
