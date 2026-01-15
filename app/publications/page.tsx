import { BookOpen, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Бүтээлийн жагсаалт / Publications | Г.Даваацэрэн',
  description: 'List of academic publications and research papers',
};

export default function PublicationsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <BookOpen className="w-8 h-8 mr-3" />
            Миний бүтээлийн жагсаалт
          </h1>
          <p className="text-gray-600">
            List of My Publications
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
          <div className="mb-8">
            <div className="bg-blue-600 dark:bg-blue-700 rounded-lg p-6 border border-blue-700">
              <p className="text-2xl font-bold text-white mb-2">
                70+ эрдэм шинжилгээний бүтээл
              </p>
              <p className="text-blue-50">
                Олон улсын болон дотоодын эрдэм шинжилгээний сэтгүүл, хурлын материалд нийтлэгдсэн
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Сүүлийн үеийн бүтээлүүд / Recent Publications
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Machine Learning Applications in Mineral Processing
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    2025 - Mineral Processing Technology Conference
                  </p>
                  <p className="text-sm text-gray-700">
                    Баяжуулалтын процесст машин сургалтыг хэрэглэх боломжууд
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Lynch-Whiten Model for Crushing Circuit Optimization
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    2025 - International Journal of Mineral Processing
                  </p>
                  <p className="text-sm text-gray-700">
                    Нунтаглалтын тохируулгын Lynch-Whiten загвар
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    JK Drop Weight Test Analysis for SAG Mill Design
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    2025 - Mining Technology Journal
                  </p>
                  <p className="text-sm text-gray-700">
                    SAG тээрмийн зураг төслийн JK тестийн шинжилгээ
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Судалгааны чиглэл / Research Areas
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">
                    Нунтаглалт, Тээрэмдэх
                  </h3>
                  <p className="text-sm text-blue-100">
                    Comminution & Grinding Technology
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">
                    Процессын загварчлал
                  </h3>
                  <p className="text-sm text-purple-100">
                    Process Modeling & Simulation
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">
                    Төмрийн хүдрийн баяжуулалт
                  </h3>
                  <p className="text-sm text-green-100">
                    Iron Ore Processing
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">
                    Нүүрсний баяжуулалт
                  </h3>
                  <p className="text-sm text-orange-100">
                    Coal Processing & Beneficiation
                  </p>
                </div>
              </div>
            </section>

            <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200">
              <p className="text-gray-700 mb-4">
                <strong>Бүтээлийн дэлгэрэнгүй жагсаалт:</strong> Миний бүх бүтээлийн жагсаалтыг 
                энэхүү блогийн 2010 оны архивт орсон "Миний бүтээлийн жагсаалт" нийтлэлээс үзнэ үү.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Full list of publications:</strong> Please refer to the blog post titled 
                "List of My Publications" in the 2010 archive for a comprehensive list of all academic works.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
