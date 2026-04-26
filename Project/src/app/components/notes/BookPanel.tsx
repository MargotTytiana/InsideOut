import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Star, BookOpen, Calendar, Tag, ChevronDown } from "lucide-react";
import { books, categories, type Book, type Category } from "../../data/booksData";

interface BookPanelProps {
  selectedBook: Book | null;
  onSelectBook: (book: Book | null) => void;
  onBookHighlight: (bookId: string | null) => void;
}

const COLORS = {
  bg: "#F5EFEB",
  bgCard: "#EEE7E0",
  navy: "#2F4156",
  teal: "#567C8D",
  skyBlue: "#C8D9E6",
  textPrimary: "#2F4156",
  textMuted: "#7A8FA0",
  border: "rgba(47, 65, 86, 0.1)",
};

const categoryColors: Record<Category, string> = {
  Philosophy: "#2F4156",
  Technology: "#3A5F7A",
  Psychology: "#4A6A5E",
  Literature: "#5A4A6E",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={10}
          fill={s <= rating ? "#567C8D" : "transparent"}
          color={s <= rating ? "#567C8D" : "rgba(47,65,86,0.25)"}
        />
      ))}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div
      style={{
        height: 3,
        background: "rgba(47, 65, 86, 0.12)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background: COLORS.teal,
          borderRadius: 2,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}

function BookCard({
  book,
  isSelected,
  isDimmed,
  onClick,
  onHover,
}: {
  book: Book;
  isSelected: boolean;
  isDimmed: boolean;
  onClick: () => void;
  onHover: (id: string | null) => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => onHover(book.graphNodeId)}
      onHoverEnd={() => onHover(null)}
      animate={{
        opacity: isDimmed ? 0.2 : 1,
        scale: isSelected ? 1.02 : 1,
      }}
      whileHover={!isDimmed ? { y: -3, scale: 1.03 } : {}}
      transition={{ duration: 0.25 }}
      style={{
        cursor: "pointer",
        borderRadius: 10,
        overflow: "hidden",
        background: COLORS.bgCard,
        border: isSelected
          ? `1.5px solid ${COLORS.teal}`
          : `1px solid ${COLORS.border}`,
        boxShadow: isSelected
          ? `0 4px 20px rgba(86, 124, 141, 0.2)`
          : "0 2px 8px rgba(47,65,86,0.06)",
      }}
    >
      {/* Cover image */}
      <div
        style={{
          position: "relative",
          height: 120,
          overflow: "hidden",
          background: "#D5CCBF",
        }}
      >
        <img
          src={book.cover}
          alt={book.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Progress overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${book.readingProgress}%`,
              background: COLORS.teal,
              opacity: 0.85,
            }}
          />
        </div>
        {/* Reading progress badge */}
        {book.readingProgress === 100 && (
          <div
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              background: COLORS.teal,
              color: "#fff",
              fontSize: "0.55rem",
              padding: "2px 6px",
              borderRadius: 999,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            ✓ Read
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "10px 10px 8px" }}>
        <p
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "0.82rem",
            color: COLORS.textPrimary,
            margin: "0 0 2px",
            lineHeight: 1.3,
            fontWeight: 600,
          }}
        >
          {book.title}
        </p>
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.65rem",
            color: COLORS.textMuted,
            margin: "0 0 6px",
          }}
        >
          {book.author} · {book.year > 0 ? book.year : `${Math.abs(book.year)} BC`}
        </p>
        <StarRating rating={book.rating} />
      </div>
    </motion.div>
  );
}

// ── Book detail / notes view ──────────────────────────────────────────────
function BookDetail({ book, onClose }: { book: Book; onClose: () => void }) {
  return (
    <motion.div
      key="book-detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Detail header */}
      <div
        style={{
          padding: "16px 20px 0",
          flexShrink: 0,
        }}
      >
        <motion.button
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: COLORS.teal,
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.72rem",
            letterSpacing: "0.04em",
            padding: 0,
            marginBottom: 16,
          }}
          whileHover={{ x: -2 }}
        >
          <ArrowLeft size={13} />
          All books
        </motion.button>

        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            marginBottom: 16,
          }}
        >
          {/* Cover thumbnail */}
          <motion.div
            layoutId={`cover-${book.id}`}
            style={{
              width: 64,
              height: 88,
              borderRadius: 6,
              overflow: "hidden",
              flexShrink: 0,
              boxShadow: "0 4px 16px rgba(47,65,86,0.2)",
            }}
          >
            <img
              src={book.cover}
              alt={book.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                display: "inline-block",
                background: categoryColors[book.category],
                color: "#fff",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: 999,
                marginBottom: 6,
              }}
            >
              {book.category}
            </span>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "1.25rem",
                color: COLORS.textPrimary,
                margin: "0 0 4px",
                lineHeight: 1.2,
              }}
            >
              {book.title}
            </h2>
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.72rem",
                color: COLORS.textMuted,
                margin: "0 0 8px",
              }}
            >
              {book.author} ·{" "}
              {book.year > 0 ? book.year : `${Math.abs(book.year)} BC`}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <StarRating rating={book.rating} />
              <span
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.62rem",
                  color: COLORS.textMuted,
                }}
              >
                {book.readingProgress}% read
              </span>
            </div>
            <div style={{ marginTop: 6, maxWidth: 180 }}>
              <ProgressBar value={book.readingProgress} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{ height: 1, background: COLORS.border, marginBottom: 0 }}
        />
      </div>

      {/* Scrollable notes content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 20px 24px",
        }}
      >
        {/* Summary */}
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.82rem",
            color: COLORS.textPrimary,
            lineHeight: 1.75,
            opacity: 0.8,
            margin: "0 0 20px",
          }}
        >
          {book.summary}
        </p>

        {/* Quote */}
        <blockquote
          style={{
            margin: "0 0 20px",
            paddingLeft: 14,
            borderLeft: `3px solid ${COLORS.teal}`,
          }}
        >
          <p
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "0.88rem",
              color: COLORS.textPrimary,
              fontStyle: "italic",
              lineHeight: 1.65,
              margin: "0 0 4px",
            }}
          >
            "{book.quote}"
          </p>
          <cite
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.64rem",
              color: COLORS.textMuted,
              fontStyle: "normal",
            }}
          >
            — {book.quoteSource}
          </cite>
        </blockquote>

        {/* Key insights */}
        <div style={{ marginBottom: 20 }}>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.64rem",
              color: COLORS.teal,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              margin: "0 0 10px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <BookOpen size={11} />
            Key Insights
          </p>
          <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {book.keyInsights.map((insight, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "rgba(86, 124, 141, 0.12)",
                    border: "1px solid rgba(86, 124, 141, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.58rem",
                    color: COLORS.teal,
                    marginTop: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.79rem",
                    color: COLORS.textPrimary,
                    lineHeight: 1.65,
                    margin: 0,
                    opacity: 0.85,
                  }}
                >
                  {insight}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.64rem",
              color: COLORS.teal,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              margin: "0 0 8px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Tag size={11} />
            Tags
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {book.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "rgba(86, 124, 141, 0.1)",
                  border: "1px solid rgba(86, 124, 141, 0.2)",
                  color: COLORS.teal,
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.64rem",
                  padding: "3px 10px",
                  borderRadius: 999,
                  letterSpacing: "0.03em",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Last updated */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 5,
            opacity: 0.4,
          }}
        >
          <Calendar size={10} color={COLORS.textMuted} />
          <span
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.62rem",
              color: COLORS.textMuted,
            }}
          >
            Last updated {book.lastUpdated}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main BookPanel ────────────────────────────────────────────────────────
export function BookPanel({ selectedBook, onSelectBook, onBookHighlight }: BookPanelProps) {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [collapsedCategories, setCollapsedCategories] = useState<Set<Category>>(new Set());

  const toggleCategory = (cat: Category) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const filteredCategories =
    activeCategory === "All"
      ? categories
      : categories.filter((c) => c === activeCategory);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: COLORS.bg,
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        {selectedBook ? (
          <BookDetail
            key="detail"
            book={selectedBook}
            onClose={() => onSelectBook(null)}
          />
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* Header */}
            <div
              style={{
                padding: "18px 20px 14px",
                borderBottom: `1px solid ${COLORS.border}`,
                flexShrink: 0,
              }}
            >
              <h1
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "1.3rem",
                  color: COLORS.navy,
                  margin: "0 0 4px",
                }}
              >
                Reading Notes
              </h1>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.72rem",
                  color: COLORS.textMuted,
                  margin: "0 0 14px",
                }}
              >
                {books.length} books across {categories.length} themes
              </p>

              {/* Category filter tabs */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                }}
              >
                {(["All", ...categories] as const).map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat as Category | "All")}
                    style={{
                      background:
                        activeCategory === cat
                          ? COLORS.teal
                          : "rgba(86, 124, 141, 0.1)",
                      color:
                        activeCategory === cat ? "#fff" : COLORS.teal,
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.64rem",
                      padding: "4px 10px",
                      borderRadius: 999,
                      border: "none",
                      cursor: "pointer",
                      letterSpacing: "0.04em",
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Book grid */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "14px 18px 24px",
              }}
            >
              {filteredCategories.map((cat) => {
                const catBooks = books.filter((b) => b.category === cat);
                const isCollapsed = collapsedCategories.has(cat);
                return (
                  <div key={cat} style={{ marginBottom: 20 }}>
                    {/* Category header */}
                    <button
                      onClick={() => toggleCategory(cat)}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "4px 0 8px",
                        marginBottom: 2,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: categoryColors[cat],
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "DM Sans, sans-serif",
                            fontSize: "0.7rem",
                            color: COLORS.textPrimary,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            opacity: 0.7,
                          }}
                        >
                          {cat}
                        </span>
                        <span
                          style={{
                            fontFamily: "DM Sans, sans-serif",
                            fontSize: "0.62rem",
                            color: COLORS.textMuted,
                          }}
                        >
                          {catBooks.length}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isCollapsed ? -90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={13} color={COLORS.textMuted} />
                      </motion.div>
                    </button>

                    {/* Books in category */}
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: 10,
                            }}
                          >
                            {catBooks.map((book) => (
                              <BookCard
                                key={book.id}
                                book={book}
                                isSelected={selectedBook?.id === book.id}
                                isDimmed={
                                  selectedBook !== null &&
                                  selectedBook.id !== book.id
                                }
                                onClick={() => onSelectBook(book)}
                                onHover={onBookHighlight}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
