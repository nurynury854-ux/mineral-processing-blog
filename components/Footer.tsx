export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">
              Г.Даваацэрэн
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ашигт малтмалын баяжуулалтын техник, технологийн талаархи мэдээлэл, судалгааны материал.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">
              Холбоос / Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Нүүр хуудас
                </a>
              </li>
              <li>
                <a href="/archive" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Архив
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Миний тухай
                </a>
              </li>
              <li>
                <a href="/publications" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Бүтээл
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">
              Холбоо барих / Contact
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Улаанбаатар, Монгол улс
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              ХААН Банк: 5128026371
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Г.Даваацэрэн. Бүх эрх хуулиар хамгаалагдсан.</p>
          <p className="mt-2">
            Mineral Processing Engineering Blog | Comminution Technology | METSIM & JKSimMet
          </p>
        </div>
      </div>
    </footer>
  );
}
