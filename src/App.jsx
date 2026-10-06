import { useState } from 'react';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentLevel, setCurrentLevel] = useState(1);

  // --- BÖLÜM 1 DURUMLARI ---
  const [inspectedCards, setInspectedCards] = useState({
    master: false,
    worker1: false,
    worker2: false,
  });

  const [openCards, setOpenCards] = useState({
    master: false,
    worker1: false,
    worker2: false,
  });

  // --- BÖLÜM 2 DURUMLARI ---
  const [l2Step, setL2Step] = useState(0);

  // --- BÖLÜM 3 DURUMLARI ---
  const [l3Choice, setL3Choice] = useState(null);

  // --- BÖLÜM 4 DURUMLARI ---
  const [l4Assignment, setL4Assignment] = useState(null);

  // --- BÖLÜM 5 DURUMLARI ---
  const [l5BackupTriggered, setL5BackupTriggered] = useState(false);
  const [l5CompletedBy, setL5CompletedBy] = useState(null);

  // --- BÖLÜM 6 DURUMLARI ---
  const [l6Choice, setL6Choice] = useState(null);

  // --- BÖLÜM 7 DURUMLARI ---
  const [l7Choice, setL7Choice] = useState(null);

  // --- BÖLÜM 8 DURUMLARI ---
  const [l8Choice, setL8Choice] = useState(null);

  // --- BÖLÜM 9 DURUMLARI ---
  const [l9Choice, setL9Choice] = useState(null);

  // --- BÖLÜM 10 DURUMLARI ---
  const [l10Choice, setL10Choice] = useState(null);

  // --- OYUN TAMAMLANDI DURUMU ---
  const [gameCompleted, setGameCompleted] = useState(false);

  // Ortak Ders Notu Paneli
  const [showSummaryPanel, setShowSummaryPanel] = useState(false);

  // Bölüm 1 - Kart Açma
  const toggleCard = (cardKey) => {
    setOpenCards((prev) => ({
      ...prev,
      [cardKey]: !prev[cardKey],
    }));

    setInspectedCards((prev) => ({
      ...prev,
      [cardKey]: true,
    }));
  };

  const allInspectedL1 =
    inspectedCards.master &&
    inspectedCards.worker1 &&
    inspectedCards.worker2;

  const handleCompleteLevel = () => {
    setShowSummaryPanel(true);
  };

  const handleNextLevel = () => {
    // 10. bölüm tamamlandıysa özel bitiş ekranına geç
    if (currentLevel === 10) {
      setShowSummaryPanel(false);
      setGameCompleted(true);
      setCurrentScreen('finish');
      return;
    }

    setShowSummaryPanel(false);
    setCurrentLevel((prev) => prev + 1);

    // Durumları sıfırla
    setInspectedCards({
      master: false,
      worker1: false,
      worker2: false,
    });

    setOpenCards({
      master: false,
      worker1: false,
      worker2: false,
    });

    setL2Step(0);
    setL3Choice(null);
    setL4Assignment(null);
    setL5BackupTriggered(false);
    setL5CompletedBy(null);
    setL6Choice(null);
    setL7Choice(null);
    setL8Choice(null);
    setL9Choice(null);
    setL10Choice(null);
  };

  const triggerBackupTask = () => {
    setL5BackupTriggered(true);

    setTimeout(() => {
      setL5CompletedBy('backup');
    }, 1200);
  };

  // Bölüm listesinde bölüme git
  const goToLevel = (level) => {
    const canAccess =
      gameCompleted || level <= currentLevel;

    if (!canAccess) {
      return;
    }

    setCurrentLevel(level);
    setCurrentScreen('game');
    setShowSummaryPanel(false);
  };

  // 1. GİRİŞ SAYFASI
  if (currentScreen === 'home') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.iconContainer}>🌐⚡</div>

          <h1 style={styles.title}>ReduceNode</h1>

          <p style={styles.subtitle}>
            WebReduce & Dağıtık Sistemler Simülatörü
          </p>

          <div style={styles.buttonGroup}>
            {!gameCompleted ? (
              <button
                style={styles.primaryButton}
                onClick={() => setCurrentScreen('game')}
              >
                ▶ OYUNA BAŞLA (Bölüm {currentLevel})
              </button>
            ) : (
              <button
                style={styles.primaryButton}
                onClick={() => setCurrentScreen('finish')}
              >
                🎉 TAMAMLANAN OYUNU GÖR
              </button>
            )}

            <button
              style={styles.secondaryButton}
              onClick={() => setCurrentScreen('levels')}
            >
              📋 BÖLÜM LİSTESİ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. BÖLÜM LİSTESİ SAYFASI
  if (currentScreen === 'levels') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Bölüm Seçimi</h2>

          <p style={styles.subtitle}>
            Gelişim haritan ve aktif seviyen
          </p>

          <div style={{ margin: '20px 0', textAlign: 'left' }}>

            {/* BÖLÜM 1 */}
            <div
              style={{
                ...styles.levelListItem,
                cursor: gameCompleted || currentLevel >= 1
                  ? 'pointer'
                  : 'default',
                border:
                  currentLevel === 1
                    ? '1px solid #38bdf8'
                    : '1px solid transparent',
              }}
              onClick={() => goToLevel(1)}
            >
              <span>1. Bölüm: Mimariyi Tanı</span>

              <span
                style={{
                  color:
                    gameCompleted || currentLevel > 1
                      ? '#4ade80'
                      : '#facc15',
                }}
              >
                {gameCompleted || currentLevel > 1
                  ? '✅ Tamamlandı'
                  : '🔓 Aktif'}
              </span>
            </div>

            {/* BÖLÜM 2 */}
            <div
              style={{
                ...styles.levelListItem,
                cursor:
                  gameCompleted || currentLevel >= 2
                    ? 'pointer'
                    : 'default',
                border:
                  currentLevel === 2
                    ? '1px solid #38bdf8'
                    : '1px solid transparent',
                opacity:
                  gameCompleted || currentLevel >= 2 ? 1 : 0.65,
              }}
              onClick={() => goToLevel(2)}
            >
              <span>2. Bölüm: Map & Reduce Mantığı</span>

              <span
                style={{
                  color:
                    gameCompleted || currentLevel > 2
                      ? '#4ade80'
                      : currentLevel === 2
                      ? '#facc15'
                      : '#64748b',
                }}
              >
                {gameCompleted || currentLevel > 2
                  ? '✅ Tamamlandı'
                  : currentLevel === 2
                  ? '🔓 Aktif'
                  : '🔒 Kilitli'}
              </span>
            </div>

            {/* BÖLÜM 3 */}
            <div
              style={{
                ...styles.levelListItem,
                cursor:
                  gameCompleted || currentLevel >= 3
                    ? 'pointer'
                    : 'default',
                border:
                  currentLevel === 3
                    ? '1px solid #38bdf8'
                    : '1px solid transparent',
                opacity:
                  gameCompleted || currentLevel >= 3 ? 1 : 0.65,
              }}
              onClick={() => goToLevel(3)}
            >
              <span>3. Bölüm: M & R Görev Sayıları</span>

              <span
                style={{
                  color:
                    gameCompleted || currentLevel > 3
                      ? '#4ade80'
                      : currentLevel === 3
                      ? '#facc15'
                      : '#64748b',
                }}
              >
                {gameCompleted || currentLevel > 3
                  ? '✅ Tamamlandı'
                  : currentLevel === 3
                  ? '🔓 Aktif'
                  : '🔒 Kilitli'}
              </span>
            </div>

            {/* BÖLÜM 4 */}
            <div
              style={{
                ...styles.levelListItem,
                cursor:
                  gameCompleted || currentLevel >= 4
                    ? 'pointer'
                    : 'default',
                border:
                  currentLevel === 4
                    ? '1px solid #38bdf8'
                    : '1px solid transparent',
                opacity:
                  gameCompleted || currentLevel >= 4 ? 1 : 0.65,
              }}
              onClick={() => goToLevel(4)}
            >
              <span>4. Bölüm: Veri Yakınlığı (Locality)</span>

              <span
                style={{
                  color:
                    gameCompleted || currentLevel > 4
                      ? '#4ade80'
                      : currentLevel === 4
                      ? '#facc15'
                      : '#64748b',
                }}
              >
                {gameCompleted || currentLevel > 4
                  ? '✅ Tamamlandı'
                  : currentLevel === 4
                  ? '🔓 Aktif'
                  : '🔒 Kilitli'}
              </span>
            </div>

            {/* BÖLÜM 5 */}
            <div
              style={{
                ...styles.levelListItem,
                cursor:
                  gameCompleted || currentLevel >= 5
                    ? 'pointer'
                    : 'default',
                border:
                  currentLevel === 5
                    ? '1px solid #38bdf8'
                    : '1px solid transparent',
                opacity:
                  gameCompleted || currentLevel >= 5 ? 1 : 0.65,
              }}
              onClick={() => goToLevel(5)}
            >
              <span>
                5. Bölüm: Yavaşlayan Sunucular (Backup Tasks)
              </span>

              <span
                style={{
                  color:
                    gameCompleted || currentLevel > 5
                      ? '#4ade80'
                      : currentLevel === 5
                      ? '#facc15'
                      : '#64748b',
                }}
              >
                {gameCompleted || currentLevel > 5
                  ? '✅ Tamamlandı'
                  : currentLevel === 5
                  ? '🔓 Aktif'
                  : '🔒 Kilitli'}
              </span>
            </div>

            {/* BÖLÜM 6 */}
            <div
              style={{
                ...styles.levelListItem,
                cursor:
                  gameCompleted || currentLevel >= 6
                    ? 'pointer'
                    : 'default',
                border:
                  currentLevel === 6
                    ? '1px solid #38bdf8'
                    : '1px solid transparent',
                opacity:
                  gameCompleted || currentLevel >= 6 ? 1 : 0.65,
              }}
              onClick={() => goToLevel(6)}
            >
              <span>6. Bölüm: Sıralama Garantileri</span>

              <span
                style={{
                  color:
                    gameCompleted || currentLevel > 6
                      ? '#4ade80'
                      : currentLevel === 6
                      ? '#facc15'
                      : '#64748b',
                }}
              >
                {gameCompleted || currentLevel > 6
                  ? '✅ Tamamlandı'
                  : currentLevel === 6
                  ? '🔓 Aktif'
                  : '🔒 Kilitli'}
              </span>
            </div>

            {/* BÖLÜM 7 */}
            <div
              style={{
                ...styles.levelListItem,
                cursor:
                  gameCompleted || currentLevel >= 7
                    ? 'pointer'
                    : 'default',
                border:
                  currentLevel === 7
                    ? '1px solid #38bdf8'
                    : '1px solid transparent',
                opacity:
                  gameCompleted || currentLevel >= 7 ? 1 : 0.65,
              }}
              onClick={() => goToLevel(7)}
            >
              <span>7. Bölüm: Yerel Çalıştırma</span>

              <span
                style={{
                  color:
                    gameCompleted || currentLevel > 7
                      ? '#4ade80'
                      : currentLevel === 7
                      ? '#facc15'
                      : '#64748b',
                }}
              >
                {gameCompleted || currentLevel > 7
                  ? '✅ Tamamlandı'
                  : currentLevel === 7
                  ? '🔓 Aktif'
                  : '🔒 Kilitli'}
              </span>
            </div>

            {/* BÖLÜM 8 */}
            <div
              style={{
                ...styles.levelListItem,
                cursor:
                  gameCompleted || currentLevel >= 8
                    ? 'pointer'
                    : 'default',
                border:
                  currentLevel === 8
                    ? '1px solid #38bdf8'
                    : '1px solid transparent',
                opacity:
                  gameCompleted || currentLevel >= 8 ? 1 : 0.65,
              }}
              onClick={() => goToLevel(8)}
            >
              <span>
                8. Bölüm: İşçi Hatası (Worker Failure)
              </span>

              <span
                style={{
                  color:
                    gameCompleted || currentLevel > 8
                      ? '#4ade80'
                      : currentLevel === 8
                      ? '#facc15'
                      : '#64748b',
                }}
              >
                {gameCompleted || currentLevel > 8
                  ? '✅ Tamamlandı'
                  : currentLevel === 8
                  ? '🔓 Aktif'
                  : '🔒 Kilitli'}
              </span>
            </div>

            {/* BÖLÜM 9 */}
            <div
              style={{
                ...styles.levelListItem,
                cursor:
                  gameCompleted || currentLevel >= 9
                    ? 'pointer'
                    : 'default',
                border:
                  currentLevel === 9
                    ? '1px solid #38bdf8'
                    : '1px solid transparent',
                opacity:
                  gameCompleted || currentLevel >= 9 ? 1 : 0.65,
              }}
              onClick={() => goToLevel(9)}
            >
              <span>
                9. Bölüm: Master Hatası
              </span>

              <span
                style={{
                  color:
                    gameCompleted || currentLevel > 9
                      ? '#4ade80'
                      : currentLevel === 9
                      ? '#facc15'
                      : '#64748b',
                }}
              >
                {gameCompleted || currentLevel > 9
                  ? '✅ Tamamlandı'
                  : currentLevel === 9
                  ? '🔓 Aktif'
                  : '🔒 Kilitli'}
              </span>
            </div>

            {/* BÖLÜM 10 */}
            <div
              style={{
                ...styles.levelListItem,
                cursor:
                  gameCompleted || currentLevel >= 10
                    ? 'pointer'
                    : 'default',
                border:
                  currentLevel === 10
                    ? '1px solid #38bdf8'
                    : '1px solid transparent',
                opacity:
                  gameCompleted || currentLevel >= 10 ? 1 : 0.65,
              }}
              onClick={() => goToLevel(10)}
            >
              <span>
                10. Bölüm: İşlem Sonrası Dağıtık Veri
              </span>

              <span
                style={{
                  color:
                    gameCompleted || currentLevel > 10
                      ? '#4ade80'
                      : currentLevel === 10
                      ? '#facc15'
                      : '#64748b',
                }}
              >
                {gameCompleted || currentLevel > 10
                  ? '✅ Tamamlandı'
                  : currentLevel === 10
                  ? '🔓 Aktif'
                  : '🔒 Kilitli'}
              </span>
            </div>

          </div>

          <button
            style={styles.secondaryButton}
            onClick={() => setCurrentScreen('home')}
          >
            ⬅ ANA MENÜYE DÖN
          </button>
        </div>
      </div>
    );
  }

  // 4. BİTİŞ EKRANI
  if (currentScreen === 'finish') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.iconContainer}>🎉🏆</div>

          <h1 style={styles.title}>
            ReduceNode Tamamlandı!
          </h1>

          <p style={styles.subtitle}>
            Tüm 10 bölümü başarıyla tamamladın.
          </p>

          <div
            style={{
              ...styles.statusBoxSuccess,
              textAlign: 'left',
              marginBottom: '20px',
            }}
          >
            <strong>Öğrendiğin konular:</strong>
            <br />
            <br />
            ✓ Master & Worker mimarisi
            <br />
            ✓ Map & Reduce mantığı
            <br />
            ✓ Görev parçalama
            <br />
            ✓ Data Locality
            <br />
            ✓ Backup Tasks & Stragglers
            <br />
            ✓ Sıralama garantileri
            <br />
            ✓ Yerel çalıştırma
            <br />
            ✓ Worker hatalarının yönetimi
            <br />
            ✓ Master hatasının sonuçları
            <br />
            ✓ İşlem sonrası dağıtık veri yönetimi
          </div>

          <div style={styles.buttonGroup}>
            <button
              style={styles.primaryButton}
              onClick={() => {
                setCurrentLevel(1);
                setGameCompleted(false);
                setCurrentScreen('game');
              }}
            >
              🔄 BAŞTAN OYNA
            </button>

            <button
              style={styles.secondaryButton}
              onClick={() => setCurrentScreen('levels')}
            >
              📋 BÖLÜMLERE GİT
            </button>

            <button
              style={styles.secondaryButton}
              onClick={() => setCurrentScreen('home')}
            >
              🏠 ANA MENÜ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5. OYUN SAYFASI
  if (currentScreen === 'game') {
    return (
      <div style={styles.container}>

        {/* YUKARIDAN KAYAN DERS NOTU PANELİ */}
        {showSummaryPanel && (
          <div style={styles.summaryOverlay}>
            <div style={styles.summaryCard}>

              <div style={styles.summaryBadge}>
                BÖLÜM TAMAMLANDI 🌟
              </div>

              {currentLevel === 1 && (
                <>
                  <h3 style={styles.summaryTitle}>
                    💡 Bölüm 1 Ders Notu: Master & Worker
                  </h3>

                  <p style={styles.summaryText}>
                    <strong>Master Node</strong> sadece iş dağıtımını ve
                    organizasyonu yönetir.
                    <strong> Worker Node'lar</strong> ise ham veriyi
                    işleyen paralel işlemcilerdir.
                  </p>
                </>
              )}

              {currentLevel === 2 && (
                <>
                  <h3 style={styles.summaryTitle}>
                    💡 Bölüm 2 Ders Notu: Map & Reduce Adımları
                  </h3>

                  <p style={styles.summaryText}>
                    <strong>Map:</strong> Ham veriyi okur ve (key, value)
                    çiftlerine dönüştürür.
                    <br />
                    <strong>Reduce:</strong> Aynı anahtara sahip değerleri
                    birleştirip gruplar.
                  </p>
                </>
              )}

              {currentLevel === 3 && (
                <>
                  <h3 style={styles.summaryTitle}>
                    💡 Bölüm 3 Ders Notu: M ve R Parçalama Oranı
                  </h3>

                  <p style={styles.summaryText}>
                    Map (M) ve Reduce (R) görev sayıları, ağdaki makine
                    sayısından çok daha fazla olmalıdır (M, R &gt;&gt;
                    Worker Sayısı).
                    <br />
                    <br />
                    Bu sayede işler küçük parçalara bölünür ve hızlı
                    çalışan sunucu boşta kalmayarak dinamik yük
                    dengelemesi sağlar.
                  </p>
                </>
              )}

              {currentLevel === 4 && (
                <>
                  <h3 style={styles.summaryTitle}>
                    💡 Bölüm 4 Ders Notu: Veri Yakınlığı (Data Locality)
                  </h3>

                  <p style={styles.summaryText}>
                    Master, Map görevini atarken
                    <strong>
                      {' '}
                      ağ bant genişliğini (network bandwidth)
                    </strong>{' '}
                    korumak ister.
                    <br />
                    <br />
                    Görevi veriyi taşıyarak başka makinada çalıştırmak
                    yerine,
                    <strong>
                      {' '}
                      verinin halihazırda yerel diskinde bulunduğu
                      Worker'a
                    </strong>{' '}
                    atar. Buna <strong>Data Locality</strong> denir.
                  </p>
                </>
              )}

              {currentLevel === 5 && (
                <>
                  <h3 style={styles.summaryTitle}>
                    💡 Bölüm 5 Ders Notu: Backup Tasks & Stragglers
                  </h3>

                  <p style={styles.summaryText}>
                    Bazen bir makinedeki disk hatası veya kaynak yarışı
                    görevi çok yavaşlatır (Straggler).
                    <br />
                    <br />
                    Master, işin bitimine yakın kilitlenen görevler için
                    başka bir boş makinede
                    <strong> Yedek Görev (Backup Task)</strong> başlatır.
                    Hangi makine önce bitirirse o kabul edilir. Bu yöntem
                    kaynak kullanımını çok az artırarak operasyonu
                    hızlandırabilir.
                  </p>
                </>
              )}

              {currentLevel === 6 && (
                <>
                  <h3 style={styles.summaryTitle}>
                    💡 Bölüm 6 Ders Notu: Sıralama Garantileri
                  </h3>

                  <p style={styles.summaryText}>
                    Bir partition içindeki ara anahtar/değer çiftleri
                    <strong> artan anahtar sırasına</strong> göre işlenebilir
                    ve sıralı bir çıktı dosyası oluşturulabilir.
                    <br />
                    <br />
                    Sıralı çıktı sayesinde seyrek indeks (Sparse Index)
                    kullanılarak önce <strong>Binary Search</strong> ile
                    ilgili bölgeye ulaşılır, ardından küçük bir aralık
                    taranarak hedef anahtar bulunur.
                  </p>
                </>
              )}

              {/* ==================== BÖLÜM 7 DERS NOTU ==================== */}
              {currentLevel === 7 && (
                <>
                  <h3 style={styles.summaryTitle}>
                    💡 Bölüm 7 Ders Notu: Yerel Çalıştırma
                  </h3>

                  <p style={styles.summaryText}>
                    Gerçek bir MapReduce işi çok sayıda makine üzerinde
                    dağıtık olarak çalışabilir. Ancak küçük ölçekli testler
                    ve hata ayıklama için işlemlerin tek bir makinede
                    sırayla çalıştırılması daha kolaydır.
                    <br />
                    <br />
                    <strong>Yerel çalıştırma</strong> sayesinde Map ve
                    Reduce görevleri tek makinede ardışık olarak
                    yürütülür. Böylece programı büyük bir dağıtık sistemde
                    çalıştırmadan önce küçük bir veri üzerinde test etmek
                    mümkün olur.
                  </p>
                </>
              )}

              {/* ==================== BÖLÜM 8 DERS NOTU ==================== */}
              {currentLevel === 8 && (
                <>
                  <h3 style={styles.summaryTitle}>
                    💡 Bölüm 8 Ders Notu: İşçi Hatası
                  </h3>

                  <p style={styles.summaryText}>
                    Dağıtık sistemlerde Worker makinelerinden biri
                    çalışmayı durdurabilir veya tamamen hata verebilir.
                    <br />
                    <br />
                    Böyle bir durumda Master, hatalı Worker'ı beklemek
                    yerine onun üzerindeki görevi
                    <strong> sağlıklı bir Worker'a yeniden atar.</strong>
                    <br />
                    <br />
                    Böylece tek bir makinenin arızalanması tüm MapReduce
                    işinin durmasına neden olmaz.
                  </p>
                </>
              )}

              {/* ==================== BÖLÜM 9 DERS NOTU ==================== */}
              {currentLevel === 9 && (
                <>
                  <h3 style={styles.summaryTitle}>
                    💡 Bölüm 9 Ders Notu: Master Hatası
                  </h3>

                  <p style={styles.summaryText}>
                    Worker hatasında yalnızca hatalı Worker'ın görevi
                    yeniden atanabilir. Ancak Master Node sistemin
                    merkezi koordinasyonunu yürüttüğü için durum farklıdır.
                    <br />
                    <br />
                    Bu senaryoda sistemde <strong>tek bir Master</strong>
                    bulunmaktadır. Master tamamen hata verdiğinde görev
                    dağıtımı ve koordinasyon bilgisi kaybedildiği için
                    mevcut MapReduce işine kaldığı yerden güvenilir şekilde
                    devam edilemez.
                    <br />
                    <br />
                    Bu nedenle işin <strong>baştan başlatılması</strong>
                    gerekir.
                  </p>
                </>
              )}

              {/* ==================== BÖLÜM 10 DERS NOTU ==================== */}
              {currentLevel === 10 && (
                <>
                  <h3 style={styles.summaryTitle}>
                    💡 Bölüm 10 Ders Notu: İşlem Sonrası Dağıtık Veri
                  </h3>

                  <p style={styles.summaryText}>
                    MapReduce işlemi tamamlandığında elde edilen sonuçların
                    tamamını tek bir makinede toplamak zorunlu değildir.
                    <br />
                    <br />
                    Büyük veri sistemlerinde sonuçlar çoğunlukla
                    <strong> dağıtık olarak tutulmaya</strong> devam eder
                    veya başka bir dağıtık işleme aşamasına aktarılır.
                    <br />
                    <br />
                    Böylece tek bir makine üzerinde gereksiz bir veri
                    toplama işlemi yapılmadan sistemin ölçeklenebilirliği
                    korunur.
                  </p>
                </>
              )}

              <button
                style={styles.primaryButton}
                onClick={handleNextLevel}
              >
                {currentLevel === 10
                  ? '🏆 OYUNU TAMAMLA'
                  : 'SONRAKİ BÖLÜME GEÇ ➔'}
              </button>

            </div>
          </div>
        )}

        <div style={styles.gameContainer}>

          {/* ÜST BİLGİ BARI */}
          <div style={styles.headerBar}>
            <button
              style={styles.backButton}
              onClick={() => setCurrentScreen('home')}
            >
              ⬅ Ana Menü
            </button>

            <span style={styles.levelTitle}>
              Bölüm {currentLevel} / 10
            </span>
          </div>

          {/* ==================== BÖLÜM 1 ==================== */}
          {currentLevel === 1 && (
            <>
              <div style={styles.instructionBox}>
                📌 <strong>Görev:</strong> Master Node ve İşçi (Worker)
                bilgisayarların üzerine tıklayarak sistemdeki rollerini
                incele.
              </div>

              <div style={styles.nodesGrid}>

                <div
                  style={{
                    ...styles.nodeCard,
                    borderColor: inspectedCards.master
                      ? '#38bdf8'
                      : '#475569',
                  }}
                  onClick={() => toggleCard('master')}
                >
                  <div style={styles.nodeHeader}>
                    <span>🧠 Master Node (Yönlendirici)</span>
                    <span>
                      {openCards.master ? '▲' : '▼'}
                    </span>
                  </div>

                  {openCards.master && (
                    <p style={styles.nodeDetail}>
                      "Ben sistemin beyniyim! Gelen büyük veriyi küçük
                      parçalara böler (Map) ve Worker'lara dağıtırım.
                      Kendim veri işlemem, sadece orchestrator görevi
                      görürüm."
                    </p>
                  )}
                </div>

                <div
                  style={{
                    ...styles.nodeCard,
                    borderColor: inspectedCards.worker1
                      ? '#4ade80'
                      : '#475569',
                  }}
                  onClick={() => toggleCard('worker1')}
                >
                  <div style={styles.nodeHeader}>
                    <span>💻 Worker-01 (İşçi Bilgisayar)</span>
                    <span>
                      {openCards.worker1 ? '▲' : '▼'}
                    </span>
                  </div>

                  {openCards.worker1 && (
                    <p style={styles.nodeDetail}>
                      "Ben veriyi işleyen sunucuyum. Master Node bana
                      haritalama (Map) görevini verdiğinde işlemci gücümü
                      kullanarak veriyi analiz ederim."
                    </p>
                  )}
                </div>

                <div
                  style={{
                    ...styles.nodeCard,
                    borderColor: inspectedCards.worker2
                      ? '#4ade80'
                      : '#475569',
                  }}
                  onClick={() => toggleCard('worker2')}
                >
                  <div style={styles.nodeHeader}>
                    <span>💻 Worker-02 (Paralel İşçi)</span>
                    <span>
                      {openCards.worker2 ? '▲' : '▼'}
                    </span>
                  </div>

                  {openCards.worker2 && (
                    <p style={styles.nodeDetail}>
                      "Sistemdeki ikinci paralel bilgisayarım. Ağa
                      katılarak işlem süresini yarı yarıya düşürürüm.
                      İş bitince sonucu Master'a raporlarım."
                    </p>
                  )}
                </div>

              </div>

              <div
                style={{
                  marginTop: '30px',
                  textAlign: 'center',
                }}
              >
                <button
                  style={{
                    ...styles.primaryButton,
                    backgroundColor: allInspectedL1
                      ? '#10b981'
                      : '#334155',
                    cursor: allInspectedL1
                      ? 'pointer'
                      : 'not-allowed',
                    opacity: allInspectedL1 ? 1 : 0.6,
                  }}
                  disabled={!allInspectedL1}
                  onClick={handleCompleteLevel}
                >
                  {allInspectedL1
                    ? '✔ BÖLÜMÜ TAMAMLA'
                    : '🔒 Tüm Kartları İncele'}
                </button>
              </div>
            </>
          )}

          {/* ==================== BÖLÜM 2 ==================== */}
          {currentLevel === 2 && (
            <>
              <div style={styles.instructionBox}>
                📌 <strong>Görev:</strong> Master Node'daki belgede geçen
                kelimelerin sayısını hesaplamak için sırayla
                <strong> MAP</strong> ve <strong>REDUCE</strong> adımlarını
                çalıştır.
              </div>

              <div
                style={{
                  ...styles.nodeCard,
                  borderColor: '#38bdf8',
                  marginBottom: '16px',
                }}
              >
                <div style={styles.nodeHeader}>
                  <span>🧠 Master Node — Ham Veri Belgesi</span>
                </div>

                <div style={styles.dataTag}>
                  📄 "elma elma armut çilek elma armut"
                </div>
              </div>

              <div
                style={{
                  ...styles.nodeCard,
                  borderColor:
                    l2Step >= 1 ? '#4ade80' : '#475569',
                  marginBottom: '16px',
                }}
              >
                <div style={styles.nodeHeader}>
                  <span>💻 Worker-1 (Mapper)</span>

                  <span
                    style={{
                      fontSize: '12px',
                      color:
                        l2Step >= 1
                          ? '#4ade80'
                          : '#94a3b8',
                    }}
                  >
                    {l2Step >= 1
                      ? '✅ Map Tamamlandı'
                      : '⏳ Bekliyor'}
                  </span>
                </div>

                <p style={styles.nodeDetail}>
                  <strong>Açıklama:</strong> Metindeki her kelimeyi
                  ayrıştırıp (Kelime, 1) anahtar-değer çiftine dönüştürür.
                </p>

                {l2Step >= 1 && (
                  <div style={styles.codeOutput}>
                    <code>
                      [("elma",1), ("elma",1), ("armut",1),
                      ("çilek",1), ("elma",1), ("armut",1)]
                    </code>
                  </div>
                )}

                {l2Step === 0 && (
                  <button
                    style={{
                      ...styles.primaryButton,
                      marginTop: '10px',
                      backgroundColor: '#0284c7',
                    }}
                    onClick={() => setL2Step(1)}
                  >
                    ⚡ MAP İŞLEMİNİ BAŞLAT
                  </button>
                )}
              </div>

              <div
                style={{
                  ...styles.nodeCard,
                  borderColor:
                    l2Step >= 2
                      ? '#4ade80'
                      : '#475569',
                  marginBottom: '16px',
                  opacity: l2Step >= 1 ? 1 : 0.5,
                }}
              >
                <div style={styles.nodeHeader}>
                  <span>💻 Worker-2 (Reducer)</span>

                  <span
                    style={{
                      fontSize: '12px',
                      color:
                        l2Step >= 2
                          ? '#4ade80'
                          : '#94a3b8',
                    }}
                  >
                    {l2Step >= 2
                      ? '✅ Reduce Tamamlandı'
                      : '🔒 Map Bekleniyor'}
                  </span>
                </div>

                <p style={styles.nodeDetail}>
                  <strong>Açıklama:</strong> Map çıktısındaki aynı
                  kelimeleri gruplayıp sayılarını toplar (Reduce).
                </p>

                {l2Step >= 2 && (
                  <div style={styles.codeOutputGreen}>
                    <code>{`{
  "elma": 3,
  "armut": 2,
  "çilek": 1
}`}</code>
                  </div>
                )}

                {l2Step === 1 && (
                  <button
                    style={{
                      ...styles.primaryButton,
                      marginTop: '10px',
                      backgroundColor: '#16a34a',
                    }}
                    onClick={() => setL2Step(2)}
                  >
                    🔄 REDUCE İŞLEMİNİ BAŞLAT
                  </button>
                )}
              </div>

              <div
                style={{
                  marginTop: '20px',
                  textAlign: 'center',
                }}
              >
                <button
                  style={{
                    ...styles.primaryButton,
                    backgroundColor:
                      l2Step === 2
                        ? '#10b981'
                        : '#334155',
                    cursor:
                      l2Step === 2
                        ? 'pointer'
                        : 'not-allowed',
                    opacity:
                      l2Step === 2 ? 1 : 0.6,
                  }}
                  disabled={l2Step < 2}
                  onClick={handleCompleteLevel}
                >
                  {l2Step === 2
                    ? '✔ BÖLÜMÜ TAMAMLA'
                    : '🔒 İşlemleri Tamamla'}
                </button>
              </div>
            </>
          )}

          {/* ==================== BÖLÜM 3 ==================== */}
          {currentLevel === 3 && (
            <>
              <div style={styles.instructionBox}>
                📌 <strong>Görev:</strong> Master Node'da Map ($M$) ve
                Reduce ($R$) parçalama stratejisini seç. Farklı seçeneklerin
                2 adet Worker bilgisayar üzerindeki etkisini gözlemle!
              </div>

              <div
                style={{
                  ...styles.nodeCard,
                  borderColor: '#38bdf8',
                  marginBottom: '16px',
                }}
              >
                <div style={styles.nodeHeader}>
                  <span>
                    🧠 Master Node — M ve R Stratejisi Seçimi
                  </span>
                </div>

                <p style={styles.nodeDetail}>
                  Ağda <strong>2 adet Worker Node</strong> var. İş yükünü
                  kaç parçaya ($M$ ve $R$) bölmeliyiz?
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginTop: '12px',
                  }}
                >
                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l3Choice === 'less'
                          ? '#0284c7'
                          : '#0f172a',
                      borderColor:
                        l3Choice === 'less'
                          ? '#38bdf8'
                          : '#334155',
                    }}
                    onClick={() => setL3Choice('less')}
                  >
                    1. M ve R Sayısı Makine Sayısından AZ
                    (M=1, R=1)
                  </button>

                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l3Choice === 'equal'
                          ? '#0284c7'
                          : '#0f172a',
                      borderColor: '#334155',
                    }}
                    onClick={() => setL3Choice('equal')}
                  >
                    2. M ve R Sayısı Makine Sayısına EŞİT
                    (M=2, R=2)
                  </button>

                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l3Choice === 'more'
                          ? '#0284c7'
                          : '#0f172a',
                      borderColor:
                        l3Choice === 'more'
                          ? '#38bdf8'
                          : '#334155',
                    }}
                    onClick={() => setL3Choice('more')}
                  >
                    3. M ve R Sayısı Makine Sayısından FAZLA
                    (M=6, R=4)
                  </button>
                </div>
              </div>

              {l3Choice && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      ...styles.nodeCard,
                      borderColor: '#475569',
                    }}
                  >
                    <div style={styles.nodeHeader}>
                      <span>
                        💻 Worker-01 & Worker-02 Durumu
                      </span>
                    </div>

                    {l3Choice === 'less' && (
                      <div style={styles.statusBoxWarning}>
                        ⚠️ <strong>Atıl Kapasite:</strong>
                        <br />
                        Sadece 1 Map ve 1 Reduce görevi oluşturuldu.
                        Worker-01 tek başına çalışırken Worker-02
                        tamamen boşta kaldı!
                      </div>
                    )}

                    {l3Choice === 'equal' && (
                      <div style={styles.statusBoxInfo}>
                        ℹ️ <strong>Birebir Eşleşme:</strong>
                        <br />
                        Worker-01'e M1, Worker-02'ye M2 görevi verildi.
                        Eğer Worker-01 yavaşlarsa Worker-02 işini
                        bitirip bekler.
                      </div>
                    )}

                    {l3Choice === 'more' && (
                      <div style={styles.statusBoxSuccess}>
                        ✅ <strong>İdeal Dinamik Dengeleme:</strong>
                        <br />
                        İş 6 küçük Map ve 4 Reduce parçasına bölündü.
                        İşini erken bitiren Worker hemen yeni parçayı
                        alır.
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div
                style={{
                  marginTop: '20px',
                  textAlign: 'center',
                }}
              >
                <button
                  style={{
                    ...styles.primaryButton,
                    backgroundColor: l3Choice
                      ? '#10b981'
                      : '#334155',
                    cursor: l3Choice
                      ? 'pointer'
                      : 'not-allowed',
                    opacity: l3Choice ? 1 : 0.6,
                  }}
                  disabled={!l3Choice}
                  onClick={handleCompleteLevel}
                >
                  {l3Choice
                    ? '✔ BÖLÜMÜ TAMAMLA'
                    : '🔒 Bir Strateji Seç'}
                </button>
              </div>
            </>
          )}

          {/* ==================== BÖLÜM 4 ==================== */}
          {currentLevel === 4 && (
            <>
              <div style={styles.instructionBox}>
                📌 <strong>Görev:</strong> Master Node olarak
                <strong> Block-A (64MB)</strong> verisini işleyecek
                Worker'ı seç. Hangi seçim ağ trafiğini yormadan en hızlı
                sonucu verecek?
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    ...styles.nodeCard,
                    flex: 1,
                    borderColor:
                      l4Assignment === 'worker1'
                        ? '#38bdf8'
                        : '#475569',
                  }}
                >
                  <div style={styles.nodeHeader}>
                    <span>💻 Worker-01</span>
                  </div>

                  <div
                    style={{
                      fontSize: '12px',
                      marginTop: '8px',
                      color: '#cbd5e1',
                    }}
                  >
                    📁 <strong>Yerel Disk:</strong>
                    <br />
                    <span style={{ color: '#38bdf8' }}>
                      [ Block-A (64MB) ]
                    </span>
                  </div>

                  <button
                    style={{
                      ...styles.primaryButton,
                      marginTop: '12px',
                      padding: '8px',
                      fontSize: '12px',
                    }}
                    onClick={() => setL4Assignment('worker1')}
                  >
                    M1 Görevini Ata
                  </button>
                </div>

                <div
                  style={{
                    ...styles.nodeCard,
                    flex: 1,
                    borderColor:
                      l4Assignment === 'worker2'
                        ? '#38bdf8'
                        : '#475569',
                  }}
                >
                  <div style={styles.nodeHeader}>
                    <span>💻 Worker-02</span>
                  </div>

                  <div
                    style={{
                      fontSize: '12px',
                      marginTop: '8px',
                      color: '#cbd5e1',
                    }}
                  >
                    📁 <strong>Yerel Disk:</strong>
                    <br />
                    <span style={{ color: '#64748b' }}>
                      [ Boş ]
                    </span>
                  </div>

                  <button
                    style={{
                      ...styles.primaryButton,
                      marginTop: '12px',
                      padding: '8px',
                      fontSize: '12px',
                    }}
                    onClick={() => setL4Assignment('worker2')}
                  >
                    M1 Görevini Ata
                  </button>
                </div>
              </div>

              {l4Assignment && (
                <div
                  style={{
                    ...styles.nodeCard,
                    borderColor:
                      l4Assignment === 'worker1'
                        ? '#4ade80'
                        : '#f97316',
                  }}
                >
                  <div style={styles.nodeHeader}>
                    <span>⚡ Atama Sonucu ve Ağ Analizi</span>
                  </div>

                  {l4Assignment === 'worker1' && (
                    <div style={styles.statusBoxSuccess}>
                      🚀 <strong>Data Locality Başarılı! (Süre: 2s)</strong>
                      <br />
                      Block-A halihazırda Worker-01'in diskinde olduğu
                      için veri ağ üzerinden taşınmadı.
                    </div>
                  )}

                  {l4Assignment === 'worker2' && (
                    <div style={styles.statusBoxWarning}>
                      🐢 <strong>Ağ Darboğazı! (Süre: 12s)</strong>
                      <br />
                      Block-A, Worker-01'in diskinden ağ üzerinden
                      Worker-02'ye aktarılmak zorunda kaldı.
                    </div>
                  )}
                </div>
              )}

              <div
                style={{
                  marginTop: '20px',
                  textAlign: 'center',
                }}
              >
                <button
                  style={{
                    ...styles.primaryButton,
                    backgroundColor: l4Assignment
                      ? '#10b981'
                      : '#334155',
                    cursor: l4Assignment
                      ? 'pointer'
                      : 'not-allowed',
                    opacity: l4Assignment ? 1 : 0.6,
                  }}
                  disabled={!l4Assignment}
                  onClick={handleCompleteLevel}
                >
                  {l4Assignment
                    ? '✔ BÖLÜMÜ TAMAMLA'
                    : '🔒 Bir Worker Seç'}
                </button>
              </div>
            </>
          )}

          {/* ==================== BÖLÜM 5 ==================== */}
          {currentLevel === 5 && (
            <>
              <div style={styles.instructionBox}>
                📌 <strong>Görev:</strong> Operasyon %95 tamamlandı ama
                <strong> Worker-01</strong> yavaş bir disk arızası yüzünden
                son görevi (Map-06) bitiremiyor (Straggler). Master olarak
                işlemi kurtarmak için <strong>Backup Task</strong> tetikle!
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    ...styles.nodeCard,
                    borderColor: '#f97316',
                  }}
                >
                  <div style={styles.nodeHeader}>
                    <span>💻 Worker-01 (Birincil Görev)</span>

                    <span
                      style={{
                        fontSize: '12px',
                        color: '#f97316',
                      }}
                    >
                      🐢 Yavaşladı (Disk Hatası)
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: '8px',
                      fontSize: '13px',
                      color: '#cbd5e1',
                    }}
                  >
                    Görev: <strong>Map-06</strong> — Durum:
                    <code>
                      %92 İlerleme (30MB/s ➔ 1MB/s düştü)
                    </code>
                  </div>
                </div>

                <div
                  style={{
                    ...styles.nodeCard,
                    borderColor: l5BackupTriggered
                      ? '#38bdf8'
                      : '#475569',
                  }}
                >
                  <div style={styles.nodeHeader}>
                    <span>💻 Worker-02 (Yedek Görev)</span>

                    <span
                      style={{
                        fontSize: '12px',
                        color: l5CompletedBy
                          ? '#4ade80'
                          : l5BackupTriggered
                          ? '#38bdf8'
                          : '#94a3b8',
                      }}
                    >
                      {l5CompletedBy
                        ? '⚡ İlk Olarak Tamamlandı!'
                        : l5BackupTriggered
                        ? '🔄 Çalışıyor...'
                        : '💤 Boşta'}
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: '8px',
                      fontSize: '13px',
                      color: '#cbd5e1',
                    }}
                  >
                    Görev: <strong>Map-06 (Backup)</strong> — Durum:
                    <code>
                      {l5CompletedBy
                        ? '%100 Tamamlandı'
                        : l5BackupTriggered
                        ? '%60 İlerleme...'
                        : 'Atama Bekleniyor'}
                    </code>
                  </div>
                </div>
              </div>

              {!l5BackupTriggered && (
                <div
                  style={{
                    textAlign: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <button
                    style={{
                      ...styles.primaryButton,
                      backgroundColor: '#eab308',
                      color: '#0f172a',
                    }}
                    onClick={triggerBackupTask}
                  >
                    🚨 Master: Backup Task Çalıştır
                    (Worker-2'yi Görevlendir)
                  </button>
                </div>
              )}

              {l5CompletedBy && (
                <div style={styles.statusBoxSuccess}>
                  🚀 <strong>Yedek Görev Kazanımı!</strong>
                  <br />
                  Worker-02 görevi saniyeler içinde %100 yaptı ve
                  Master'a raporladı. Worker-01'in yavaşlaması tüm
                  sistemi kilitlemekten kurtarıldı!
                </div>
              )}

              <div
                style={{
                  marginTop: '20px',
                  textAlign: 'center',
                }}
              >
                <button
                  style={{
                    ...styles.primaryButton,
                    backgroundColor: l5CompletedBy
                      ? '#10b981'
                      : '#334155',
                    cursor: l5CompletedBy
                      ? 'pointer'
                      : 'not-allowed',
                    opacity: l5CompletedBy ? 1 : 0.6,
                  }}
                  disabled={!l5CompletedBy}
                  onClick={handleCompleteLevel}
                >
                  {l5CompletedBy
                    ? '✔ BÖLÜMÜ TAMAMLA'
                    : '🔒 Backup Task Tetikle'}
                </button>
              </div>
            </>
          )}

          {/* ==================== BÖLÜM 6 ==================== */}
          {currentLevel === 6 && (
            <>
              <div style={styles.instructionBox}>
                📌 <strong>Görev:</strong> Bir partition içindeki kayıtlar
                anahtar sırasına göre tutulmaktadır.
                <strong> Sıralı çıktıyı</strong> doğru seç ve sistemin
                arama için neden bu sıradan yararlandığını gözlemle.
              </div>

              <div
                style={{
                  ...styles.nodeCard,
                  borderColor: '#38bdf8',
                  marginBottom: '16px',
                }}
              >
                <div style={styles.nodeHeader}>
                  <span>
                    🧠 Master Node — Partition Çıktısı
                  </span>

                  <span
                    style={{
                      fontSize: '12px',
                      color:
                        l6Choice === 'correct'
                          ? '#4ade80'
                          : '#94a3b8',
                    }}
                  >
                    {l6Choice === 'correct'
                      ? '✅ Sıralama Doğru'
                      : '⏳ Seçim Bekleniyor'}
                  </span>
                </div>

                <p style={styles.nodeDetail}>
                  Aşağıdaki seçeneklerden
                  <strong> artan anahtar sırasına</strong> sahip olan
                  partition çıktısını seç.
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginTop: '12px',
                  }}
                >
                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l6Choice === 'wrong1'
                          ? '#7f1d1d'
                          : '#0f172a',
                      borderColor:
                        l6Choice === 'wrong1'
                          ? '#ef4444'
                          : '#334155',
                    }}
                    onClick={() => setL6Choice('wrong1')}
                  >
                    1. armut → muz → elma → kiraz
                  </button>

                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l6Choice === 'correct'
                          ? '#166534'
                          : '#0f172a',
                      borderColor:
                        l6Choice === 'correct'
                          ? '#4ade80'
                          : '#334155',
                    }}
                    onClick={() => setL6Choice('correct')}
                  >
                    2. armut → elma → kiraz → muz
                  </button>

                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l6Choice === 'wrong2'
                          ? '#7f1d1d'
                          : '#0f172a',
                      borderColor:
                        l6Choice === 'wrong2'
                          ? '#ef4444'
                          : '#334155',
                    }}
                    onClick={() => setL6Choice('wrong2')}
                  >
                    3. muz → kiraz → elma → armut
                  </button>
                </div>
              </div>

              {l6Choice === 'correct' && (
                <div
                  style={{
                    ...styles.nodeCard,
                    borderColor: '#4ade80',
                    marginBottom: '16px',
                  }}
                >
                  <div style={styles.nodeHeader}>
                    <span>🔎 Seyrek İndeks ile Arama</span>

                    <span
                      style={{
                        color: '#4ade80',
                        fontSize: '12px',
                      }}
                    >
                      ✅ Hazır
                    </span>
                  </div>

                  <p style={styles.nodeDetail}>
                    Çıktı sıralı olduğu için sistem, tüm dosyayı baştan
                    sona taramak yerine seyrek indeks üzerinde
                    <strong> Binary Search</strong> kullanarak hedef
                    anahtarın bulunduğu bölgeye hızlıca ulaşabilir.
                  </p>

                  <div style={styles.codeOutputGreen}>
                    <code>{`Sparse Index:
armut → kayıt 1
kiraz → kayıt 3

Aranan anahtar: kiraz
→ İndeks üzerinden ilgili bölge bulundu
→ Küçük aralık tarandı
→ Anahtar bulundu`}</code>
                  </div>
                </div>
              )}

              {(l6Choice === 'wrong1' ||
                l6Choice === 'wrong2') && (
                <div style={styles.statusBoxWarning}>
                  ⚠️ <strong>Sıralama Garantisi Sağlanmadı!</strong>
                  <br />
                  Partition içindeki anahtarlar artan sırada olmalıdır.
                  Yeniden dene.
                </div>
              )}

              <div
                style={{
                  marginTop: '20px',
                  textAlign: 'center',
                }}
              >
                <button
                  style={{
                    ...styles.primaryButton,
                    backgroundColor:
                      l6Choice === 'correct'
                        ? '#10b981'
                        : '#334155',
                    cursor:
                      l6Choice === 'correct'
                        ? 'pointer'
                        : 'not-allowed',
                    opacity:
                      l6Choice === 'correct' ? 1 : 0.6,
                  }}
                  disabled={l6Choice !== 'correct'}
                  onClick={handleCompleteLevel}
                >
                  {l6Choice === 'correct'
                    ? '✔ BÖLÜMÜ TAMAMLA'
                    : '🔒 Sıralı Çıktıyı Seç'}
                </button>
              </div>
            </>
          )}

          {/* ==================== BÖLÜM 7 ==================== */}
          {currentLevel === 7 && (
            <>
              <div style={styles.instructionBox}>
                📌 <strong>Görev:</strong> Büyük bir MapReduce işini
                binlerce bilgisayarda çalıştırmadan önce küçük bir veri
                üzerinde test etmek istiyorsun. Hata ayıklama ve test
                için hangi çalışma modunu seçmelisin?
              </div>

              {/* TEST VERİSİ */}
              <div
                style={{
                  ...styles.nodeCard,
                  borderColor: '#38bdf8',
                  marginBottom: '16px',
                }}
              >
                <div style={styles.nodeHeader}>
                  <span>🧠 Master Node — Test Verisi</span>

                  <span
                    style={{
                      fontSize: '12px',
                      color: '#94a3b8',
                    }}
                  >
                    Küçük Ölçekli Test
                  </span>
                </div>

                <div style={styles.dataTag}>
                  📄 "elma elma armut"
                </div>

                <p style={styles.nodeDetail}>
                  Bu küçük veri üzerinde MapReduce işlemini test
                  edeceğiz. Henüz binlerce Worker kullanmamıza gerek yok.
                </p>
              </div>

              {/* ÇALIŞMA MODU SEÇİMİ */}
              <div
                style={{
                  ...styles.nodeCard,
                  borderColor:
                    l7Choice === 'local'
                      ? '#4ade80'
                      : l7Choice === 'distributed'
                      ? '#f97316'
                      : '#475569',
                  marginBottom: '16px',
                }}
              >
                <div style={styles.nodeHeader}>
                  <span>⚙️ Çalışma Modu Seçimi</span>

                  <span
                    style={{
                      fontSize: '12px',
                      color:
                        l7Choice === 'local'
                          ? '#4ade80'
                          : l7Choice === 'distributed'
                          ? '#f97316'
                          : '#94a3b8',
                    }}
                  >
                    {l7Choice === 'local'
                      ? '✅ Yerel Mod Seçildi'
                      : l7Choice === 'distributed'
                      ? '⚠️ Dağıtık Mod Seçildi'
                      : '⏳ Seçim Bekleniyor'}
                  </span>
                </div>

                <p style={styles.nodeDetail}>
                  Küçük ölçekli test ve hata ayıklama için hangi yöntemi
                  kullanmalısın?
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginTop: '12px',
                  }}
                >
                  {/* DAĞITIK MOD */}
                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l7Choice === 'distributed'
                          ? '#7f1d1d'
                          : '#0f172a',
                      borderColor:
                        l7Choice === 'distributed'
                          ? '#ef4444'
                          : '#334155',
                    }}
                    onClick={() =>
                      setL7Choice('distributed')
                    }
                  >
                    🌐 1. Dağıtık Çalıştır
                    <br />
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      Map ve Reduce görevlerini farklı
                      Worker'lara dağıt.
                    </span>
                  </button>

                  {/* YEREL MOD */}
                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l7Choice === 'local'
                          ? '#166534'
                          : '#0f172a',
                      borderColor:
                        l7Choice === 'local'
                          ? '#4ade80'
                          : '#334155',
                    }}
                    onClick={() => setL7Choice('local')}
                  >
                    💻 2. Yerel Çalıştır
                    <br />
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      Tüm Map ve Reduce görevlerini tek
                      makinede sırayla çalıştır.
                    </span>
                  </button>
                </div>
              </div>

              {/* YANLIŞ SEÇİM */}
              {l7Choice === 'distributed' && (
                <div style={styles.statusBoxWarning}>
                  ⚠️ <strong>Bu test için gereksiz dağıtım!</strong>
                  <br />
                  Küçük bir veri üzerinde hata ayıklamak için binlerce
                  makineye ihtiyaç yoktur. Yerel çalıştırma, işlemleri
                  tek makinede sırayla çalıştırarak küçük ölçekli
                  testleri kolaylaştırır.
                </div>
              )}

              {/* DOĞRU SEÇİM */}
              {l7Choice === 'local' && (
                <div
                  style={{
                    ...styles.nodeCard,
                    borderColor: '#4ade80',
                    marginBottom: '16px',
                  }}
                >
                  <div style={styles.nodeHeader}>
                    <span>💻 Local Machine — Yerel Çalıştırma</span>

                    <span
                      style={{
                        color: '#4ade80',
                        fontSize: '12px',
                      }}
                    >
                      ✅ Test Başarılı
                    </span>
                  </div>

                  <p style={styles.nodeDetail}>
                    Tüm görevler tek makinede ardışık olarak
                    çalıştırılıyor.
                  </p>

                  {/* MAP */}
                  <div
                    style={{
                      backgroundColor: '#0f172a',
                      padding: '12px',
                      borderRadius: '6px',
                      marginTop: '10px',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                    }}
                  >
                    <div
                      style={{
                        color: '#38bdf8',
                        fontWeight: 'bold',
                        marginBottom: '6px',
                      }}
                    >
                      MAP
                    </div>

                    <div style={{ color: '#cbd5e1' }}>
                      ("elma", 1)
                      <br />
                      ("elma", 1)
                      <br />
                      ("armut", 1)
                    </div>
                  </div>

                  {/* REDUCE */}
                  <div
                    style={{
                      backgroundColor: '#0f172a',
                      padding: '12px',
                      borderRadius: '6px',
                      marginTop: '10px',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                    }}
                  >
                    <div
                      style={{
                        color: '#4ade80',
                        fontWeight: 'bold',
                        marginBottom: '6px',
                      }}
                    >
                      REDUCE
                    </div>

                    <div style={{ color: '#cbd5e1' }}>
                      elma → 2
                      <br />
                      armut → 1
                    </div>
                  </div>

                  <div
                    style={{
                      ...styles.statusBoxSuccess,
                      marginTop: '12px',
                    }}
                  >
                    🚀 <strong>Yerel Test Başarılı!</strong>
                    <br />
                    Map ve Reduce görevleri tek makinede sırayla
                    çalıştırıldı. Küçük ölçekli test ve hata ayıklama
                    için yerel çalıştırma kullanılabilir.
                  </div>
                </div>
              )}

              {/* TAMAMLAMA */}
              <div
                style={{
                  marginTop: '20px',
                  textAlign: 'center',
                }}
              >
                <button
                  style={{
                    ...styles.primaryButton,
                    backgroundColor:
                      l7Choice === 'local'
                        ? '#10b981'
                        : '#334155',
                    cursor:
                      l7Choice === 'local'
                        ? 'pointer'
                        : 'not-allowed',
                    opacity:
                      l7Choice === 'local' ? 1 : 0.6,
                  }}
                  disabled={l7Choice !== 'local'}
                  onClick={handleCompleteLevel}
                >
                  {l7Choice === 'local'
                    ? '✔ BÖLÜMÜ TAMAMLA'
                    : '🔒 Yerel Çalıştırmayı Seç'}
                </button>
              </div>
            </>
          )}

          {/* ==================== BÖLÜM 8 ==================== */}
          {currentLevel === 8 && (
            <>
              <div style={styles.instructionBox}>
                📌 <strong>Görev:</strong> Worker-01 çalışmayı durdurdu ve
                üzerindeki <strong>Map-04</strong> görevi yarım kaldı.
                Master olarak sistemi kurtarmak için ne yapmalısın?
              </div>

              {/* ARIZALI WORKER */}
              <div
                style={{
                  ...styles.nodeCard,
                  borderColor: '#ef4444',
                  marginBottom: '16px',
                }}
              >
                <div style={styles.nodeHeader}>
                  <span>💻 Worker-01</span>

                  <span
                    style={{
                      fontSize: '12px',
                      color: '#ef4444',
                    }}
                  >
                    ❌ ÇALIŞMIYOR
                  </span>
                </div>

                <p style={styles.nodeDetail}>
                  Worker-01 bağlantısını kaybetti. Üzerindeki
                  <strong> Map-04</strong> görevi tamamlanamadı.
                </p>

                <div
                  style={{
                    backgroundColor: '#0f172a',
                    padding: '10px',
                    borderRadius: '6px',
                    marginTop: '10px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: '#f87171',
                  }}
                >
                  Worker-01 → OFFLINE
                  <br />
                  Map-04 → %47 tamamlandı
                  <br />
                  Görev → Yarım kaldı
                </div>
              </div>

              {/* ÇÖZÜM SEÇİMİ */}
              <div
                style={{
                  ...styles.nodeCard,
                  borderColor:
                    l8Choice === 'correct'
                      ? '#4ade80'
                      : l8Choice
                      ? '#ef4444'
                      : '#475569',
                  marginBottom: '16px',
                }}
              >
                <div style={styles.nodeHeader}>
                  <span>🧠 Master Node — Ne Yapılmalı?</span>

                  <span
                    style={{
                      fontSize: '12px',
                      color:
                        l8Choice === 'correct'
                          ? '#4ade80'
                          : l8Choice
                          ? '#ef4444'
                          : '#94a3b8',
                    }}
                  >
                    {l8Choice === 'correct'
                      ? '✅ Doğru Karar'
                      : l8Choice
                      ? '❌ Yanlış Karar'
                      : '⏳ Karar Bekleniyor'}
                  </span>
                </div>

                <p style={styles.nodeDetail}>
                  Worker-01 artık çalışmadığına göre Map-04 görevinin
                  tamamlanmasını nasıl sağlamalısın?
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginTop: '12px',
                  }}
                >
                  {/* SEÇENEK 1 */}
                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l8Choice === 'wait'
                          ? '#7f1d1d'
                          : '#0f172a',
                      borderColor:
                        l8Choice === 'wait'
                          ? '#ef4444'
                          : '#334155',
                    }}
                    onClick={() => setL8Choice('wait')}
                  >
                    ⏳ 1. Worker-01'in tekrar çalışmasını bekle
                    <br />
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      Görevin aynı Worker'da tamamlanmasını bekle.
                    </span>
                  </button>

                  {/* SEÇENEK 2 - DOĞRU */}
                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l8Choice === 'correct'
                          ? '#166534'
                          : '#0f172a',
                      borderColor:
                        l8Choice === 'correct'
                          ? '#4ade80'
                          : '#334155',
                    }}
                    onClick={() => setL8Choice('correct')}
                  >
                    🔄 2. Görevi sağlıklı bir Worker'a yeniden ata
                    <br />
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      Map-04 görevini Worker-02'ye yeniden gönder.
                    </span>
                  </button>

                  {/* SEÇENEK 3 */}
                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l8Choice === 'restart'
                          ? '#7f1d1d'
                          : '#0f172a',
                      borderColor:
                        l8Choice === 'restart'
                          ? '#ef4444'
                          : '#334155',
                    }}
                    onClick={() => setL8Choice('restart')}
                  >
                    🔴 3. Tüm MapReduce işini baştan başlat
                    <br />
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      Diğer Worker'ların yaptığı işleri de sıfırla.
                    </span>
                  </button>
                </div>
              </div>

              {/* YANLIŞ SEÇİM */}
              {(l8Choice === 'wait' || l8Choice === 'restart') && (
                <div style={styles.statusBoxWarning}>
                  ⚠️ <strong>Yanlış Karar!</strong>
                  <br />
                  Çalışmayan bir Worker'ı beklemek sistemi gereksiz yere
                  durdurur. Tüm işi baştan başlatmak da diğer Worker'ların
                  yaptığı işlemleri boşa çıkarır.
                  <br />
                  <br />
                  Master, yarım kalan görevi sağlıklı bir Worker'a
                  yeniden atamalıdır.
                </div>
              )}

              {/* DOĞRU SEÇİM */}
              {l8Choice === 'correct' && (
                <div
                  style={{
                    ...styles.nodeCard,
                    borderColor: '#4ade80',
                    marginBottom: '16px',
                  }}
                >
                  <div style={styles.nodeHeader}>
                    <span>💻 Worker-02</span>

                    <span
                      style={{
                        color: '#4ade80',
                        fontSize: '12px',
                      }}
                    >
                      ✅ Görev Yeniden Atandı
                    </span>
                  </div>

                  <p style={styles.nodeDetail}>
                    Master, Worker-01'in tamamlayamadığı Map-04 görevini
                    sağlıklı olan Worker-02'ye yeniden gönderdi.
                  </p>

                  <div style={styles.codeOutputGreen}>
                    <code>{`Worker-01 → OFFLINE
Map-04 → Yarım kaldı

Master → Map-04 yeniden atanıyor...

Worker-02 → Map-04
Map-04 → %100 Tamamlandı

Sistem → Çalışmaya devam ediyor ✓`}</code>
                  </div>

                  <div
                    style={{
                      ...styles.statusBoxSuccess,
                      marginTop: '12px',
                    }}
                  >
                    🚀 <strong>Worker Hatası Yönetildi!</strong>
                    <br />
                    Hatalı Worker beklenmedi. Yarım kalan görev sağlıklı
                    bir Worker'a yeniden atanarak işin devam etmesi sağlandı.
                  </div>
                </div>
              )}

              {/* TAMAMLAMA */}
              <div
                style={{
                  marginTop: '20px',
                  textAlign: 'center',
                }}
              >
                <button
                  style={{
                    ...styles.primaryButton,
                    backgroundColor:
                      l8Choice === 'correct'
                        ? '#10b981'
                        : '#334155',
                    cursor:
                      l8Choice === 'correct'
                        ? 'pointer'
                        : 'not-allowed',
                    opacity:
                      l8Choice === 'correct' ? 1 : 0.6,
                  }}
                  disabled={l8Choice !== 'correct'}
                  onClick={handleCompleteLevel}
                >
                  {l8Choice === 'correct'
                    ? '✔ BÖLÜMÜ TAMAMLA'
                    : '🔒 Doğru Çözümü Seç'}
                </button>
              </div>
            </>
          )}

          {/* ==================== BÖLÜM 9 ==================== */}
          {currentLevel === 9 && (
            <>
              <div style={styles.instructionBox}>
                📌 <strong>Görev:</strong> Master Node tamamen hata verdi
                ve sistemle bağlantısı kesildi. Sistemde yalnızca tek bir
                Master bulunuyor. Bu durumda ne yapılmalı?
              </div>

              {/* MASTER HATASI */}
              <div
                style={{
                  ...styles.nodeCard,
                  borderColor: '#ef4444',
                  marginBottom: '16px',
                }}
              >
                <div style={styles.nodeHeader}>
                  <span>🧠 Master Node</span>

                  <span
                    style={{
                      fontSize: '12px',
                      color: '#ef4444',
                    }}
                  >
                    ❌ MASTER HATASI
                  </span>
                </div>

                <p style={styles.nodeDetail}>
                  Master Node çalışmayı tamamen durdurdu. Worker-01 ve
                  Worker-02 hâlâ açık olsa da görevlerin koordinasyonu
                  artık yapılamıyor.
                </p>

                <div
                  style={{
                    backgroundColor: '#0f172a',
                    padding: '10px',
                    borderRadius: '6px',
                    marginTop: '10px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: '#f87171',
                  }}
                >
                  Master → OFFLINE
                  <br />
                  Worker-01 → Çalışıyor
                  <br />
                  Worker-02 → Çalışıyor
                  <br />
                  Koordinasyon → Kayıp
                </div>
              </div>

              {/* MASTER HATASI KARARI */}
              <div
                style={{
                  ...styles.nodeCard,
                  borderColor:
                    l9Choice === 'restart'
                      ? '#4ade80'
                      : l9Choice
                      ? '#ef4444'
                      : '#475569',
                  marginBottom: '16px',
                }}
              >
                <div style={styles.nodeHeader}>
                  <span>🧠 Sistem Yöneticisi — Ne Yapılmalı?</span>

                  <span
                    style={{
                      fontSize: '12px',
                      color:
                        l9Choice === 'restart'
                          ? '#4ade80'
                          : l9Choice
                          ? '#ef4444'
                          : '#94a3b8',
                    }}
                  >
                    {l9Choice === 'restart'
                      ? '✅ Doğru Karar'
                      : l9Choice
                      ? '❌ Yanlış Karar'
                      : '⏳ Karar Bekleniyor'}
                  </span>
                </div>

                <p style={styles.nodeDetail}>
                  Tek Master'ın tamamen kaybedildiği bu durumda
                  MapReduce işinin nasıl devam ettirilmesi gerekir?
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginTop: '12px',
                  }}
                >
                  {/* 1 */}
                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l9Choice === 'wait'
                          ? '#7f1d1d'
                          : '#0f172a',
                      borderColor:
                        l9Choice === 'wait'
                          ? '#ef4444'
                          : '#334155',
                    }}
                    onClick={() => setL9Choice('wait')}
                  >
                    ⏳ 1. Master'ın tekrar açılmasını bekle
                    <br />
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      Mevcut işin kaldığı yerden devam etmesini bekle.
                    </span>
                  </button>

                  {/* 2 */}
                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l9Choice === 'newMaster'
                          ? '#7f1d1d'
                          : '#0f172a',
                      borderColor:
                        l9Choice === 'newMaster'
                          ? '#ef4444'
                          : '#334155',
                    }}
                    onClick={() => setL9Choice('newMaster')}
                  >
                    🧠 2. Worker-01'i yeni Master yap
                    <br />
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      Mevcut Worker'lardan birini Master olarak atayıp
                      aynı işi devam ettir.
                    </span>
                  </button>

                  {/* 3 - DOĞRU */}
                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l9Choice === 'restart'
                          ? '#166534'
                          : '#0f172a',
                      borderColor:
                        l9Choice === 'restart'
                          ? '#4ade80'
                          : '#334155',
                    }}
                    onClick={() => setL9Choice('restart')}
                  >
                    🔄 3. MapReduce işini baştan başlat
                    <br />
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      Yeni bir Master ile tüm işi yeniden başlat.
                    </span>
                  </button>
                </div>
              </div>

              {/* YANLIŞ */}
              {(l9Choice === 'wait' ||
                l9Choice === 'newMaster') && (
                <div style={styles.statusBoxWarning}>
                  ⚠️ <strong>Yanlış Karar!</strong>
                  <br />
                  Bu senaryoda sistemde tek bir Master bulunuyor.
                  Master'ın hata vermesiyle mevcut işin koordinasyonu
                  kaybediliyor.
                  <br />
                  <br />
                  Bu nedenle mevcut işin güvenilir biçimde kaldığı yerden
                  devam etmesi yerine MapReduce işinin baştan başlatılması
                  gerekiyor.
                </div>
              )}

              {/* DOĞRU */}
              {l9Choice === 'restart' && (
                <div
                  style={{
                    ...styles.nodeCard,
                    borderColor: '#4ade80',
                    marginBottom: '16px',
                  }}
                >
                  <div style={styles.nodeHeader}>
                    <span>🔄 Yeni MapReduce Çalışması</span>

                    <span
                      style={{
                        color: '#4ade80',
                        fontSize: '12px',
                      }}
                    >
                      ✅ Yeniden Başlatıldı
                    </span>
                  </div>

                  <p style={styles.nodeDetail}>
                    Master hatası nedeniyle mevcut iş sonlandırıldı.
                    Sistem yeni bir Master ile MapReduce işini baştan
                    başlatıyor.
                  </p>

                  <div style={styles.codeOutputGreen}>
                    <code>{`Eski Master → OFFLINE

Mevcut İş → Sonlandırıldı

Yeni Master → Başlatıldı
Yeni Map Tasks → Oluşturuldu
Yeni Reduce Tasks → Oluşturuldu

MapReduce → Baştan başlatıldı ✓`}</code>
                  </div>

                  <div
                    style={{
                      ...styles.statusBoxSuccess,
                      marginTop: '12px',
                    }}
                  >
                    🚀 <strong>Master Hatası Yönetildi!</strong>
                    <br />
                    Tek Master'ın kaybedilmesi mevcut koordinasyonu
                    sona erdirdi. İş yeni bir Master ile baştan
                    başlatıldı.
                  </div>
                </div>
              )}

              {/* TAMAMLAMA */}
              <div
                style={{
                  marginTop: '20px',
                  textAlign: 'center',
                }}
              >
                <button
                  style={{
                    ...styles.primaryButton,
                    backgroundColor:
                      l9Choice === 'restart'
                        ? '#10b981'
                        : '#334155',
                    cursor:
                      l9Choice === 'restart'
                        ? 'pointer'
                        : 'not-allowed',
                    opacity:
                      l9Choice === 'restart' ? 1 : 0.6,
                  }}
                  disabled={l9Choice !== 'restart'}
                  onClick={handleCompleteLevel}
                >
                  {l9Choice === 'restart'
                    ? '✔ BÖLÜMÜ TAMAMLA'
                    : '🔒 Doğru Çözümü Seç'}
                </button>
              </div>
            </>
          )}

          {/* ==================== BÖLÜM 10 ==================== */}
          {currentLevel === 10 && (
            <>
              <div style={styles.instructionBox}>
                📌 <strong>Görev:</strong> MapReduce işlemi tamamlandı.
                Worker'larda bulunan sonuç verileriyle işlem bittikten
                sonra ne yapılmalı?
              </div>

              {/* İŞLEM SONUCU */}
              <div
                style={{
                  ...styles.nodeCard,
                  borderColor: '#38bdf8',
                  marginBottom: '16px',
                }}
              >
                <div style={styles.nodeHeader}>
                  <span>🧠 MapReduce — İşlem Tamamlandı</span>

                  <span
                    style={{
                      fontSize: '12px',
                      color: '#4ade80',
                    }}
                  >
                    ✅ İşlem Bitti
                  </span>
                </div>

                <p style={styles.nodeDetail}>
                  Map ve Reduce görevleri tamamlandı. Sonuç verileri
                  Worker makinelerinde partition'lar halinde bulunuyor.
                </p>

                <div style={styles.codeOutput}>
                  <code>{`Worker-01 → Partition-A
Worker-02 → Partition-B
Worker-03 → Partition-C

MapReduce → %100 Tamamlandı`}</code>
                </div>
              </div>

              {/* VERİ SONRASI KARARI */}
              <div
                style={{
                  ...styles.nodeCard,
                  borderColor:
                    l10Choice === 'correct'
                      ? '#4ade80'
                      : l10Choice
                      ? '#ef4444'
                      : '#475569',
                  marginBottom: '16px',
                }}
              >
                <div style={styles.nodeHeader}>
                  <span>🧠 Master Node — Sonraki Adım</span>

                  <span
                    style={{
                      fontSize: '12px',
                      color:
                        l10Choice === 'correct'
                          ? '#4ade80'
                          : l10Choice
                          ? '#ef4444'
                          : '#94a3b8',
                    }}
                  >
                    {l10Choice === 'correct'
                      ? '✅ Doğru Karar'
                      : l10Choice
                      ? '❌ Yanlış Karar'
                      : '⏳ Karar Bekleniyor'}
                  </span>
                </div>

                <p style={styles.nodeDetail}>
                  Büyük miktardaki sonuç verileri Worker'larda dağıtık
                  şekilde bulunuyor. Şimdi ne yapılmalı?
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginTop: '12px',
                  }}
                >
                  {/* 1 */}
                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l10Choice === 'collect'
                          ? '#7f1d1d'
                          : '#0f172a',
                      borderColor:
                        l10Choice === 'collect'
                          ? '#ef4444'
                          : '#334155',
                    }}
                    onClick={() => setL10Choice('collect')}
                  >
                    📦 1. Tüm verileri tek makinede topla
                    <br />
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      Worker'lardaki tüm sonuçları tek bir bilgisayara
                      aktar.
                    </span>
                  </button>

                  {/* 2 - DOĞRU */}
                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l10Choice === 'correct'
                          ? '#166534'
                          : '#0f172a',
                      borderColor:
                        l10Choice === 'correct'
                          ? '#4ade80'
                          : '#334155',
                    }}
                    onClick={() => setL10Choice('correct')}
                  >
                    🌐 2. Veriyi dağıtık olarak tut veya yeniden işle
                    <br />
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      Sonuçları dağıtık olarak barındır veya başka bir
                      dağıtık işleme aşamasına aktar.
                    </span>
                  </button>

                  {/* 3 */}
                  <button
                    style={{
                      ...styles.choiceButton,
                      backgroundColor:
                        l10Choice === 'delete'
                          ? '#7f1d1d'
                          : '#0f172a',
                      borderColor:
                        l10Choice === 'delete'
                          ? '#ef4444'
                          : '#334155',
                    }}
                    onClick={() => setL10Choice('delete')}
                  >
                    🗑️ 3. İşlem bitince tüm sonuçları sil
                    <br />
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      MapReduce çıktılarının tamamını kaldır.
                    </span>
                  </button>
                </div>
              </div>

              {/* YANLIŞ */}
              {(l10Choice === 'collect' ||
                l10Choice === 'delete') && (
                <div style={styles.statusBoxWarning}>
                  ⚠️ <strong>Yanlış Karar!</strong>
                  <br />
                  Büyük verinin tamamını tek bir makinede toplamak
                  gereksiz bir darboğaz oluşturabilir. İşlem bittikten
                  sonra sonuçların mutlaka tek noktada toplanması
                  gerekmez.
                  <br />
                  <br />
                  Sonuçlar dağıtık olarak tutulabilir veya başka bir
                  dağıtık işleme aşamasına gönderilebilir.
                </div>
              )}

              {/* DOĞRU */}
              {l10Choice === 'correct' && (
                <div
                  style={{
                    ...styles.nodeCard,
                    borderColor: '#4ade80',
                    marginBottom: '16px',
                  }}
                >
                  <div style={styles.nodeHeader}>
                    <span>🌐 Dağıtık Veri Sistemi</span>

                    <span
                      style={{
                        color: '#4ade80',
                        fontSize: '12px',
                      }}
                    >
                      ✅ Veri Korundu
                    </span>
                  </div>

                  <p style={styles.nodeDetail}>
                    Sonuç verilerinin tek bir makinede toplanmasına gerek
                    yok. Veriler dağıtık olarak tutulabilir veya yeni bir
                    dağıtık işleme aşamasına aktarılabilir.
                  </p>

                  <div style={styles.codeOutputGreen}>
                    <code>{`Worker-01 → Partition-A
Worker-02 → Partition-B
Worker-03 → Partition-C

          ↓

Dağıtık Veri Sistemi

          ↓

✓ Dağıtık olarak barındırılabilir
✓ Başka bir MapReduce işine aktarılabilir
✓ Tek makinede toplama zorunluluğu yok`}</code>
                  </div>

                  <div
                    style={{
                      ...styles.statusBoxSuccess,
                      marginTop: '12px',
                    }}
                  >
                    🚀 <strong>Dağıtık Veri Korundu!</strong>
                    <br />
                    Büyük veri sistemlerinde işlem tamamlandıktan sonra
                    sonuçların dağıtık yapıda tutulması veya başka bir
                    dağıtık işleme aşamasına aktarılması ölçeklenebilirliği
                    korur.
                  </div>
                </div>
              )}

              {/* TAMAMLAMA */}
              <div
                style={{
                  marginTop: '20px',
                  textAlign: 'center',
                }}
              >
                <button
                  style={{
                    ...styles.primaryButton,
                    backgroundColor:
                      l10Choice === 'correct'
                        ? '#10b981'
                        : '#334155',
                    cursor:
                      l10Choice === 'correct'
                        ? 'pointer'
                        : 'not-allowed',
                    opacity:
                      l10Choice === 'correct' ? 1 : 0.6,
                  }}
                  disabled={l10Choice !== 'correct'}
                  onClick={handleCompleteLevel}
                >
                  {l10Choice === 'correct'
                    ? '✔ BÖLÜMÜ TAMAMLA'
                    : '🔒 Doğru Çözümü Seç'}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    );
  }
}

// STİLLER
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, Roboto, sans-serif',
    color: '#f8fafc',
    padding: '20px',
    position: 'relative',
  },

  card: {
    backgroundColor: '#1e293b',
    padding: '35px 30px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
    border: '1px solid #334155',
  },

  iconContainer: {
    fontSize: '48px',
    marginBottom: '10px',
  },

  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
    color: '#38bdf8',
  },

  subtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    marginBottom: '20px',
  },

  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  primaryButton: {
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
  },

  secondaryButton: {
    backgroundColor: '#334155',
    color: '#f1f5f9',
    border: '1px solid #475569',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
  },

  choiceButton: {
    color: '#f8fafc',
    border: '1px solid #334155',
    padding: '12px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },

  gameContainer: {
    maxWidth: '600px',
    width: '100%',
  },

  headerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: '12px 20px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '1px solid #334155',
  },

  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '14px',
  },

  levelTitle: {
    fontWeight: 'bold',
    color: '#38bdf8',
  },

  instructionBox: {
    backgroundColor: '#1e293b',
    padding: '14px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '20px',
    borderLeft: '4px solid #38bdf8',
    lineHeight: '1.5',
  },

  nodesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  nodeCard: {
    backgroundColor: '#1e293b',
    padding: '16px 20px',
    borderRadius: '10px',
    border: '2px solid #475569',
    transition: 'all 0.2s ease',
  },

  nodeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    color: '#e2e8f0',
  },

  nodeDetail: {
    marginTop: '8px',
    fontSize: '13px',
    color: '#94a3b8',
    lineHeight: '1.5',
  },

  dataTag: {
    backgroundColor: '#0f172a',
    color: '#facc15',
    padding: '10px',
    borderRadius: '6px',
    marginTop: '10px',
    fontSize: '13px',
    fontFamily: 'monospace',
  },

  codeOutput: {
    backgroundColor: '#0f172a',
    padding: '10px',
    borderRadius: '6px',
    marginTop: '10px',
    fontSize: '12px',
    color: '#38bdf8',
    fontFamily: 'monospace',
    wordBreak: 'break-all',
  },

  codeOutputGreen: {
    backgroundColor: '#0f172a',
    padding: '10px',
    borderRadius: '6px',
    marginTop: '10px',
    fontSize: '13px',
    color: '#4ade80',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
  },

  statusBoxWarning: {
    backgroundColor: '#451a03',
    borderLeft: '4px solid #f97316',
    color: '#fdba74',
    padding: '12px',
    borderRadius: '6px',
    marginTop: '10px',
    fontSize: '13px',
    lineHeight: '1.5',
  },

  statusBoxInfo: {
    backgroundColor: '#1e3a8a',
    borderLeft: '4px solid #60a5fa',
    color: '#bfdbfe',
    padding: '12px',
    borderRadius: '6px',
    marginTop: '10px',
    fontSize: '13px',
    lineHeight: '1.5',
  },

  statusBoxSuccess: {
    backgroundColor: '#064e3b',
    borderLeft: '4px solid #34d399',
    color: '#a7f3d0',
    padding: '12px',
    borderRadius: '6px',
    marginTop: '10px',
    fontSize: '13px',
    lineHeight: '1.5',
  },

  summaryOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '60px',
    zIndex: 100,
  },

  summaryCard: {
    backgroundColor: '#1e293b',
    padding: '30px',
    borderRadius: '16px',
    maxWidth: '480px',
    width: '90%',
    border: '2px solid #38bdf8',
    boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
    textAlign: 'center',
  },

  summaryBadge: {
    backgroundColor: '#166534',
    color: '#4ade80',
    padding: '6px 14px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block',
    marginBottom: '12px',
  },

  summaryTitle: {
    fontSize: '18px',
    margin: '0 0 12px 0',
    color: '#f8fafc',
  },

  summaryText: {
    fontSize: '14px',
    color: '#cbd5e1',
    lineHeight: '1.6',
    marginBottom: '24px',
    textAlign: 'left',
  },

  levelListItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px',
    backgroundColor: '#0f172a',
    borderRadius: '8px',
    marginBottom: '8px',
    fontSize: '14px',
    transition: 'all 0.2s ease',
  },
};

export default App;