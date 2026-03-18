import { PDFUploader } from "@/components/pdf-uploader/pdf-uploader";

export default function Home() {
  return (
    <section className="h-[calc(100dvh-65px)] w-full grid grid-rows-3 grid-cols-1 sm:grid-rows-1 sm:grid-cols-3">
      <aside className="h-full flex items-center justify-center p-4 sm:p-6">
        <PDFUploader />
      </aside>
      <aside className="h-full flex items-center justify-center border--2 sm:border-t-0 sm:border-l row-span-2 sm:row-span-1 col-span-1 sm:col-span-2">
        2
      </aside>
    </section>
  );
}
