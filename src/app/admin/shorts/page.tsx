import { getShorts } from "@/actions/auth/shorts/get-shorts";
import { Wrapper } from "@/components";
import { FormShorts } from "@/components/ui/admin/shorts/FormShorts";
import siteId from "@/utils/getSiteId";

export default async function SettingsPage() {
  const shorts = await getShorts(siteId);

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">
            {shorts && <FormShorts siteId={siteId} shorts={shorts} />}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
