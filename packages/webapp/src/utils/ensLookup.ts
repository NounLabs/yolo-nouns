import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';

const NNS_REGISTRY = '0x3e1970dc478991b49c4327973ea8a4862ef5a4de';
const ENS_REGISTRY = '0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e';

export const useReverseENSLookUp = (address: string) => {
  const { library } = useEthers();
  const [ens, setEns] = useState<string>();

  useEffect(() => {
    let mounted = true;
    if (address && library) {
      library.network.ensAddress = NNS_REGISTRY;

      library
        .lookupAddress(address)
        .then(name => {
          if (!name) {
          	  library.network.ensAddress = ENS_REGISTRY;
		      library
		        .lookupAddress(address)
		        .then(name2 => {
		          if (!name2) return;
		          if (mounted) {
		            setEns(name2);
		          }
		        })
		        .catch(error => {
		          console.log(`error resolving reverse ens lookup: `, error);
		        });
          }


          if (mounted) {
            setEns(name!);
          }
        })
        .catch(error => {
          console.log(`error resolving reverse ens lookup: `, error);
        });
    }

    return () => {
      setEns('');
      mounted = false;
    };
  }, [address, library]);

  return ens;
};
