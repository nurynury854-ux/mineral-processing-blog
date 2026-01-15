import { User, Award, Briefcase, BookOpen } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Миний тухай / About | Г.Даваацэрэн',
  description: 'About G.Davaatseren - Mineral Processing Engineer',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              <Image
                src="/PFP.png"
                alt="G.Davaatseren"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Г.Даваацэрэн
              </h1>
              <p className="text-xl text-gray-600">
                G.Davaatseren
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Улаанбаатар, Монгол улс
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <User className="w-6 h-6 mr-2" />
                Танилцуулга / Introduction
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-black leading-relaxed">
                  Би ашигт малтмалын баяжуулалтын чиглэлээр мэргэшсэн инженер бөгөөд 
                  уул уурхайн салбарт олон жил ажилласан туршлагатай. Энэхүү блогоор дамжуулан 
                  миний судалгааны ажил, практик туршлага болон баяжуулалтын чиглэлийн 
                  сүүлийн үеийн технологи, техникийн талаархи мэдээллийг хуваалцдаг.
                </p>
                <p className="text-black leading-relaxed mt-4">
                  I am a mineral processing engineer with extensive experience in the mining industry. 
                  Through this blog, I share my research work, practical experience, and information 
                  about the latest technologies and techniques in mineral processing.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2" />
                Боловсрол ба Мэргэшил / Education & Expertise
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-2">
                    MSc, Mineral Processing Engineering
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Магистрын зэрэг, Ашигт малтмалын баяжуулалт
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Consulting Engineer of Mongolia
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Монгол улсын зөвлөх инженер
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Briefcase className="w-6 h-6 mr-2" />
                Мэргэжлийн чиглэл / Specialization
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-600 dark:bg-blue-700 rounded-lg p-4 border border-blue-700">
                  <h3 className="font-semibold text-white mb-2">
                    Comminution Technology
                  </h3>
                  <p className="text-sm text-blue-100">
                    Нунтаглалт, Тээрэмдэх технологи
                  </p>
                </div>

                <div className="bg-purple-600 dark:bg-purple-700 rounded-lg p-4 border border-purple-700">
                  <h3 className="font-semibold text-white mb-2">
                    Computer Simulation
                  </h3>
                  <p className="text-sm text-purple-100">
                    METSIM & JKSimMet
                  </p>
                </div>

                <div className="bg-green-600 dark:bg-green-700 rounded-lg p-4 border border-green-700">
                  <h3 className="font-semibold text-white mb-2">
                    Programming
                  </h3>
                  <p className="text-sm text-green-100">
                    Python & R
                  </p>
                </div>

                <div className="bg-orange-600 dark:bg-orange-700 rounded-lg p-4 border border-orange-700">
                  <h3 className="font-semibold text-white mb-2">
                    Machine Learning & AI
                  </h3>
                  <p className="text-sm text-orange-100">
                    Баяжуулалтын процесст хэрэглэх
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Бүтээлийн тоо / Publications
              </h2>
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-lg p-6 border border-blue-700">
                <p className="text-4xl font-bold text-white mb-2">
                  70+
                </p>
                <p className="text-blue-50">
                  Олон улсын болон дотоодын эрдэм шинжилгээний сэтгүүл, хурлын материалд 
                  нийтлэгдсэн илтгэл, өгүүлэл
                </p>
                <a 
                  href="/publications" 
                  className="inline-block mt-4 text-white hover:text-blue-100 hover:underline font-medium"
                >
                  Бүтээлийн жагсаалт үзэх →
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Холбоо барих / Contact
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Миний блогт зочилсон танд баярлалаа. Асуулт, санал байвал 
                  эдгээр хаягаар холбогдоорой.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span> <a href="mailto:gedavaa@gmail.com" className="text-blue-600 hover:underline">gedavaa@gmail.com</a>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Миний утас:</span> 86684710
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Youtube:</span> <a href="https://www.youtube.com/@gedavaa" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@gedavaa</a>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Байршил:</span> Улаанбаатар, Монгол улс
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Дэмжлэг:</span> ХААН Банк - 5128026371
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
