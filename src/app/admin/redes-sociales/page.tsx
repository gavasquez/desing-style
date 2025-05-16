import { getSiteSettings } from '@/actions/auth/settigns/getSiteSettings';
import { FormRedesSociales, Wrapper } from "@/components";
import siteId from '@/utils/getSiteId';

export default async function RedesSocialesPage() {

    const site = await getSiteSettings(siteId);

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">
            {
              site ? (<FormRedesSociales site={site} siteId={ siteId } />) : (<FormRedesSociales siteId={ siteId } />)
            }
          </div>
        </div>
      </div>
    </Wrapper>
  );
}