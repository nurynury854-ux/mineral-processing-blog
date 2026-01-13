import { User, Award, Briefcase, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Миний тухай / About | Г.Даваацэрэн',
  description: 'About G.Davaatseren - Mineral Processing Engineer',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8 md:p-12">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-4xl">Г</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Г.Даваацэрэн
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                G.Davaatseren
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Улаанбаатар, Монгол улс
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <User className="w-6 h-6 mr-2" />
                Танилцуулга / Introduction
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Би ашигт малтмалын баяжуулалтын чиглэлээр мэргэшсэн инженер бөгөөд 
                  уул уурхайн салбарт олон жил ажилласан туршлагатай. Энэхүү блогоор дамжуулан 
                  миний судалгааны ажил, практик туршлага болон баяжуулалтын чиглэлийн 
                  сүүлийн үеийн технологи, техникийн талаархи мэдээллийг хуваалцдаг.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  I am a mineral processing engineer with extensive experience in the mining industry. 
                  Through this blog, I share my research work, practical experience, and information 
                  about the latest technologies and techniques in mineral processing.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2" />
                Боловсрол ба Мэргэшил / Education & Expertise
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    MSc, Mineral Processing Engineering
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Магистрын зэрэг, Ашигт малтмалын баяжуулалт
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    Consulting Engineer of Mongolia
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Монгол улсын зөвлөх инженер
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Briefcase className="w-6 h-6 mr-2" />
                Мэргэжлийн чиглэл / Specialization
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Comminution Technology
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Нунтаглалт, Тээрэмдэх технологи
                  </p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Computer Simulation
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    METSIM & JKSimMet
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Programming
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Python & R
                  </p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-950 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Machine Learning & AI
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Баяжуулалтын процесст хэрэглэх
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Бүтээлийн тоо / Publications
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  70+
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Олон улсын болон дотоодын эрдэм шинжилгээний сэтгүүл, хурлын материалд 
                  нийтлэгдсэн илтгэл, өгүүлэл
                </p>
                <a 
                  href="/publications" 
                  className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Бүтээлийн жагсаалт үзэх →
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Холбоо барих / Contact
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Миний блогт зочилсон танд баярлалаа. Асуулт, санал байвал 
                  эдгээр хаягаар холбогдоорой.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Байршил:</span> Улаанбаатар, Монгол улс
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
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
