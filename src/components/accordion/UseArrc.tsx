import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function UseArrc() {
  return (
    <Accordion type='single' collapsible className='w-full text-sm font-light'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>팝업스토어 제보는 어떻게 하나요?</AccordionTrigger>
        <AccordionContent className='text-xs text-gray-400 font-light'>
          고객센터 우측 탭의 제보 혹은 문의하기를 참조해주세요.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>회원 탈퇴는 어떻게 하나요?</AccordionTrigger>
        <AccordionContent>왜요. 안돼.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>To-go는 어떻게 만드나요?</AccordionTrigger>
        <AccordionContent>투고를 만드시면 됩니다. </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-4'>
        <AccordionTrigger>스탬프는 어떻게 모을 수 있나요?</AccordionTrigger>
        <AccordionContent>팝업스토어 방문시 관계자에게 qr로 받을 수 있습니다.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-5'>
        <AccordionTrigger>위시리스트를 지우고 싶어요.</AccordionTrigger>
        <AccordionContent>삭제를 이용해주세요.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-6'>
        <AccordionTrigger>팝업스토어 정보를 수정하고 싶어요.</AccordionTrigger>
        <AccordionContent>제보 및 문의를 이용해 주세요.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
