import ImagePreview from './RightPanel/Design/ImagePreview'
import Dimension from './RightPanel/Design/Dimension'
import Style from './RightPanel/Design/Style'
import Text from './RightPanel/Design/Text'
import Icon from './RightPanel/Design/Icon'

import BoxItem from './Main/Component/BoxItem'
import TextItem from './Main/Component/TextItem'
import ImageItem from './Main/Component/ImageItem'
import IconItem from './Main/Component/IconItem'

import { defaultComponent } from './config'
import React from 'react'

type IView = {

} & any

export const designTabComponents: {
  [key: string]:{
    icon: string
    view: (id: string, data: any, profile: any, selected: string, list: any[], setList: any) => JSX.Element 
    data: any
    components: JSX.Element[]
  }
} = {
  text: {
    icon: 'fa-regular fa-text',
    view: (id, data, profile, selected, list, setList) => (
      <TextItem
        key={id}
        id={id}
        data={{ ...data }}
        selected={selected}
        list={list}
        setList={setList}
      ></TextItem>
    ) ,
    data: {
      ...defaultComponent.common,
      ...defaultComponent.text,
      content: 'Typing here...',
    },
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>],
  },
  name: {
    view: (id, data, profile) => (
      <TextItem key={id} id={id} data={{ ...data, content: profile.name }}></TextItem>
    ),
    data: {
      ...defaultComponent.common,
    },
    icon: 'fa-solid fa-signature',
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>],
  },
  email: {
    view: (id, data, profile) => (
      <TextItem key={id} id={id} data={{ ...data, content: profile.email }}></TextItem>
    ),
    data: {
      ...defaultComponent.common,
    },

    icon: 'fa-solid fa-at',
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>],
  },
  github: {
    view: (id, data, profile) => (
      <TextItem key={id} id={id} data={{ ...data, content: profile.github }}></TextItem>
    ),
    data: {
      ...defaultComponent.common,
    },
    icon: 'fa-brands fa-github',
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>],
  },
  linkedin: {
    data: {
      ...defaultComponent.common,
    },
    icon: 'fa-brands fa-linkedin',
    view: (id, data, profile) => (
      <TextItem key={id} id={id} data={{ ...data, content: profile.linkedin }}></TextItem>
    ),
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>],
  },
  phone: {
    view: (id, data, profile) => (
      <TextItem key={id} id={id} data={{ ...data, content: profile.phone }}></TextItem>
    ),
    data: {
      ...defaultComponent.common,
    },
    icon: 'fa-solid fa-phone-plus',
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>],
  },
  professional: {
    data: {
      ...defaultComponent.common,
    },
    icon: 'fa-solid fa-sparkles',
    view: (id, data, profile) => (
      <TextItem key={id} id={id} data={{ ...data, content: profile.professional }}></TextItem>
    ),
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>],
  },
  box: {
    data: {
      ...defaultComponent.common,
      ...defaultComponent.box,
    },
    icon: 'fa-solid fa-layer-group',
    view: (id, data) => <BoxItem key={id} id={id} data={{ ...data }}></BoxItem>,
    components: [<Dimension key={0}></Dimension>, <Style key={1}></Style>],
  },
  image: {
    icon: 'fa-solid fa-image',
    data: {
      ...defaultComponent.common,
      ...defaultComponent.image,
    },
    view: (id, data) => <ImageItem key={id} id={id} data={{ ...data }}></ImageItem>,
    components: [<ImagePreview key={0}></ImagePreview>, <Dimension key={1}></Dimension>],
  },
  icon: {
    data: {
      ...defaultComponent.common,
      ...defaultComponent.icon,
    },
    icon: 'fa-solid fa-icons',
    view: (id, data) => <IconItem key={id} id={id} data={{ ...data }}></IconItem>,
    components: [<Icon key={0}></Icon>, <Dimension key={1}></Dimension>],
  },
}
