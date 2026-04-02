import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { sanitiseHtml } from '@/components/common/Util.ts'

interface AlertDrawerProps {
  alert: Alert | null
  isOpen: boolean
  onClose: () => void
}

const AlertDrawer = ({ alert, isOpen, onClose }: AlertDrawerProps) => {
  if (!alert) return null

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <div>
          <DrawerHeader>
            <DrawerTitle>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left">
                {alert.summary}
              </h4>
            </DrawerTitle>
            <DrawerDescription>
              <div className="flex flex-col gap-4">
                <p className="scroll-m-20 font-semibold tracking-tight text-left">
                  {[alert.startDate, alert.endDate].filter(Boolean).join(' - ')}
                </p>
              </div>
            </DrawerDescription>
            <div
              className="prose prose-sm max-w-none text-left"
              dangerouslySetInnerHTML={{
                __html: sanitiseHtml(alert.descriptionHtml),
              }}
            />
          </DrawerHeader>
          <DrawerFooter>
            <small className="scroll-m-20 italic tracking-tight opacity-50 text-left">
              Last Updated: {alert.lastUpdated}
            </small>
            <DrawerClose asChild>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AlertDrawer
