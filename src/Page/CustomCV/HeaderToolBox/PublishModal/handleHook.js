import html2canvas from 'html2canvas'
import { getContract as getContractMarket } from '@contract/employeeMarket'
import generate from '@helper/generate'
import { getTokenId, publishTemplate } from '@api/employee/customcv'
import useToJson from '../../hooks/useToJson'
import { throws } from 'assert'

export const handlePublishTemplate = async ({
  address,
  nftName,
  nftPrice,
  autoCreatement,
  list,
}) => {
  const contractMarket = await getContractMarket()
  const hashId = generate(3)

  await contractMarket.methods.publishNFT(nftPrice, hashId).send({ from: address })

  const nft = await getTokenId(address, hashId).then((success) => {
    if (success.data.messages === 'success') return success.data['nft']
  })
  if (!nft) return
  const canvas = await html2canvas(document.getElementById('draw_child'))
  const metadataPromise = async () => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(async (image) => {
        let fd = new FormData()
        fd.append('id', nft['tokenId'])
        fd.append('name', nftName)
        fd.append('data', JSON.stringify(useToJson(autoCreatement, list)))
        fd.append('image', image)
        await publishTemplate(fd)
          .then((success) => resolve(success))
          .catch((error) => {
            reject(new Error(error))
          })
      })
    })
  }
  await metadataPromise()
}
