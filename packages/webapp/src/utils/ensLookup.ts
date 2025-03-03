import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';
import { lookupNNSOrENS } from './lookupNNSOrENS';

export const useReverseENSLookUp = (address: string) => {
  const { library } = useEthers();
  const [ens, setEns] = useState<string>();

  useEffect(() => {
    let mounted = true;
    if (address && library) {    	
      //library.lookupAddress(address)
		lookupNNSOrENS(library, address)
        .then(name => {
          if (!name) return;
          
          if (mounted) {
            setEns(name);
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
